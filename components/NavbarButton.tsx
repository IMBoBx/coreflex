"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarButtonProps {
    href: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    external?: boolean;
}

export default function NavbarButton({
    href,
    icon,
    children,
    onClick,
    className = "",
    external = false,
}: NavbarButtonProps) {
    const pathname = usePathname();
    // More precise active state: only highlight if it's the exact path
    const isActive = pathname === href;
    const buttonContent = (
        <div
            className={`flex items-center gap-3 w-full px-4 py-3 text-left font-medium rounded-lg transition-colors duration-200 touch-manipulation ${
                isActive
                    ? "bg-blue-600 text-white border border-blue-500"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white active:bg-gray-700"
            } ${className}`}
        >
            {icon && (
                <span
                    className={`flex-shrink-0 w-5 h-5 ${
                        isActive ? "text-white" : "text-gray-400"
                    }`}
                >
                    {icon}
                </span>
            )}
            <span className="flex-1">{children}</span>
            {isActive && (
                <span className="w-2 h-2 bg-white rounded-full"></span>
            )}
        </div>
    );

    if (external || onClick) {
        return (
            <button
                onClick={onClick || (() => window.open(href, "_blank"))}
                className="w-full text-left"
            >
                {buttonContent}
            </button>
        );
    }

    return (
        <Link href={href} className="block w-full">
            {buttonContent}
        </Link>
    );
}
