"use client";

import { DecodedPayload } from "@/lib/authenticateToken";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({
    children,
    allowedRoles = [],
}: {
    children: React.ReactNode;
    allowedRoles: ("client" | "admin")[];
}) {
    const router = useRouter();
    const [authChecked, setAuthChecked] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login");
            return;
        }

        try {
            const decoded: DecodedPayload = jwtDecode(token);

            // Check if token expired
            if (decoded.exp && Date.now() >= decoded.exp * 1000) {
                localStorage.removeItem("token");
                localStorage.removeItem("userData");
                localStorage.removeItem("userDataTimestamp");
                router.push("/login");
                return;
            }

            // Check role authorization
            if (allowedRoles.includes(decoded.role)) {
                setAuthChecked(true);
            } else {
                router.push("/login");
                return;
            }
        } catch {
            localStorage.removeItem("token");
            localStorage.removeItem("userData");
            localStorage.removeItem("userDataTimestamp");
            router.push("/login");
        }
    }, [router, allowedRoles]);

    return authChecked ? <>{children}</> : null;
}
