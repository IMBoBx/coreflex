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
            // if token expired, return
            if (decoded.exp && Date.now() >= decoded.exp * 1000) {
                localStorage.removeItem("token");
                router.push("/login");
                return;
            }

            if (allowedRoles.includes(decoded.role)) {
                setAuthChecked(true);
            } else {
                router.push("/login");
                return;
            }
        } catch {
            localStorage.removeItem("token");
            router.push("/login");
        }
    }, [router, allowedRoles]);

    return authChecked && <>{children}</>;
}
