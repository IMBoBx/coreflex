"use client";

import { DecodedPayload } from "@/lib/authenticateToken";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<
    | { token: string | null; role: string | null; userId: string | null }
    | undefined
>(undefined);

export default function ProtectedRoute({
    children,
    allowedRoles = [],
}: {
    children: React.ReactNode;
    allowedRoles: ("client" | "admin")[];
}) {
    const router = useRouter();
    const [authChecked, setAuthChecked] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (!storedToken) {
            router.push("/login");
            return;
        }

        try {
            const decoded: DecodedPayload = jwtDecode(storedToken);

            if (
                (decoded.exp && Date.now() >= decoded.exp * 1000) ||
                !allowedRoles.includes(decoded.role)
            ) {
                throw new Error("Logged out");
            }
            localStorage.setItem("userId", decoded.userId);
            localStorage.setItem("role", decoded.role);
            setToken(storedToken);
            setRole(decoded.role);
            setUserId(decoded.userId);
            setAuthChecked(true);
        } catch {
            localStorage.removeItem("token");
            localStorage.removeItem("userData");
            setToken(null);
            setRole(null);
            setUserId(null);
            router.push("/login");
        }
    }, [router, allowedRoles]);
    return authChecked ? (
        <AuthContext.Provider value={{ token, role, userId }}>
            {children}
        </AuthContext.Provider>
    ) : null;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
