"use client";

import { useRouter } from "next/navigation";

export default function Logout() {
    const router = useRouter();

    return (
        <button
            onClick={() => {
                localStorage.clear();
                router.push("/login");
            }}
            className="py-2 px-10 border border-gray-400 rounded-4xl float-right"
        >
            Logout
        </button>
    );
}
