import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-slate-300 mb-4">
                        404
                    </h1>
                    <h2 className="text-3xl font-bold text-slate-800 mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-lg text-slate-600 mb-8">
                        The page you're looking for doesn't exist or has been
                        moved.
                    </p>
                </div>

                <div className="space-y-4">
                    <Link
                        href="/"
                        className="inline-block bg-slate-800 text-white hover:bg-slate-700 transition-colors duration-300 px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl"
                    >
                        Go Home
                    </Link>

                    <div className="flex justify-center space-x-4">
                        <Link
                            href="/login"
                            className="text-slate-600 hover:text-slate-800 transition-colors duration-300 underline"
                        >
                            Login
                        </Link>
                        <span className="text-slate-400">•</span>
                        <Link
                            href="/#contact"
                            className="text-slate-600 hover:text-slate-800 transition-colors duration-300 underline"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm text-slate-500">
                        Return to <strong>Coreflex Pilates Studio</strong> and
                        continue your fitness journey
                    </p>
                </div>
            </div>
        </div>
    );
}
