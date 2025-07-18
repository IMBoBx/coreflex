"use client";
import { FetchApi } from "@/lib/fetchApi";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Page() {
    const router = useRouter();
    const [step, setStep] = useState<"email" | "otp">("email");
    const [email, setEmail] = useState<string>("");
    const [otp, setOtp] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [countdown, setCountdown] = useState<number>(0);

    // Check if user is already logged in
    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            if (token) {
                router.push("/dashboard");
            }
        }
    }, [router]);

    // Countdown timer for resend OTP
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await FetchApi.post("/auth/request-otp", { email });

            if (res?.data?.success || res?.data?.message) {
                setStep("otp");
                setCountdown(60); // 60 second cooldown
            } else if (res?.data?.error) {
                setError(res.data.error);
            }
        } catch (err: any) {
            setError("Failed to send OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await FetchApi.post("/auth/verify-otp", { email, otp });

            if (res?.data?.success && res?.data?.token) {
                // Store auth data in localStorage
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userId", res.data.userId);
                localStorage.setItem("role", res.data.role);
                localStorage.setItem("userData", JSON.stringify(res.data.user));
                localStorage.setItem(
                    "userDataTimestamp",
                    Date.now().toString()
                );

                // Redirect to dashboard
                router.push("/dashboard");
            } else if (res?.data?.error) {
                setError(res.data.error);
            }
        } catch (err: any) {
            setError("Invalid OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (countdown > 0) return;

        setError("");
        setLoading(true);

        try {
            const res = await FetchApi.post("/auth/request-otp", { email });

            if (res?.data?.success || res?.data?.message) {
                setCountdown(60);
                setError(""); // Clear any previous errors
            } else if (res?.data?.error) {
                setError(res.data.error);
            }
        } catch (err: any) {
            setError("Failed to resend OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const goBackToEmail = () => {
        setStep("email");
        setOtp("");
        setError("");
        setCountdown(0);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-6">
            <div className="w-full max-w-sm">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome to Coreflex
                    </h1>
                    <p className="text-gray-600">
                        {step === "email"
                            ? "Enter your email to get started"
                            : "Enter the OTP sent to your email"}
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-600 text-sm text-center">
                            {error}
                        </p>
                    </div>
                )}

                {/* Email Step */}
                {step === "email" && (
                    <form onSubmit={handleEmailSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-800"
                                placeholder="you@example.com"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !email.trim()}
                            className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Sending OTP...</span>
                                </div>
                            ) : (
                                "Send OTP"
                            )}
                        </button>
                    </form>
                )}

                {/* OTP Step */}
                {step === "otp" && (
                    <div className="space-y-6">
                        {/* Back Button */}
                        <button
                            onClick={goBackToEmail}
                            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            Change email
                        </button>

                        {/* Email Display */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-blue-800 text-sm text-center">
                                OTP sent to <strong>{email}</strong>
                            </p>
                        </div>

                        <form onSubmit={handleOtpSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="otp"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Enter OTP
                                </label>
                                <input
                                    type="text"
                                    id="otp"
                                    value={otp}
                                    onChange={(e) =>
                                        setOtp(
                                            e.target.value
                                                .replace(/\D/g, "")
                                                .slice(0, 6)
                                        )
                                    }
                                    required
                                    disabled={loading}
                                    className="w-full px-4 py-3 border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-center text-lg font-mono tracking-widest"
                                    placeholder="000000"
                                    maxLength={6}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading || otp.length < 4}
                                className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Verifying...</span>
                                    </div>
                                ) : (
                                    "Verify OTP"
                                )}
                            </button>
                        </form>

                        {/* Resend OTP */}
                        <div className="text-center">
                            <p className="text-gray-600 text-sm mb-2">
                                Didn't receive the code?
                            </p>
                            <button
                                onClick={handleResendOtp}
                                disabled={countdown > 0 || loading}
                                className="text-purple-600 hover:text-purple-700 font-medium disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                            >
                                {countdown > 0
                                    ? `Resend in ${countdown}s`
                                    : "Resend OTP"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
