"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
	children?: React.ReactNode;
	logoSrc?: string;
	logoAlt?: string;
	logoUrl: string;
}

export default function Navbar({
	children,
	logoSrc = "/logo.svg",
	logoAlt = "CoreFlex Logo",
	logoUrl,
}: NavbarProps) {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	const handleLogout = () => {
		localStorage.clear();
		router.push("/login");
	};

	const toggleNavbar = () => {
		setIsOpen(!isOpen);
	};

	const closeNavbar = () => {
		setIsOpen(false);
	};

	return (
		<>
			{" "}
			{/* Top Navigation Bar */}
			<nav className="fixed top-0 left-0 right-0 h-16 bg-gray-900 border-b border-gray-800 z-80">
				<div className="flex items-center justify-between h-full px-4">
					{/* Hamburger Button */}
					<button
						onClick={toggleNavbar}
						className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200 touch-manipulation relative z-80"
						aria-label="Toggle navigation menu"
					>
						<div className="w-6 h-6 flex flex-col justify-center items-center">
							<span
								className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
									isOpen
										? "rotate-45 translate-y-1"
										: "-translate-y-0.5"
								}`}
							></span>
							<span
								className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
									isOpen ? "opacity-0" : "opacity-100"
								}`}
							></span>
							<span
								className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
									isOpen
										? "-rotate-45 -translate-y-1"
										: "translate-y-0.5"
								}`}
							></span>
						</div>
					</button>

					{/* Logo in Center */}
					<div className="absolute left-1/2 transform -translate-x-1/2">
						<Link href={logoUrl}>
							<Image
								src={logoSrc}
								alt={logoAlt}
								width={120}
								height={32}
								className="h-16 w-auto filter brightness-0 invert"
								priority
								draggable={false}
							/>
						</Link>
					</div>

					{/* Right side - placeholder for future items */}
					<div className="w-10"></div>
				</div>
			</nav>{" "}
			{/* Backdrop */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
					onClick={closeNavbar}
				></div>
			)}{" "}
			{/* Sidebar Menu */}
			<div
				className={`fixed top-0 left-0 h-screen w-80 max-w-[85vw] bg-gray-900 border-r border-gray-800 z-60 transform transition-transform duration-300 ease-in-out ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="flex flex-col h-full">
					{/* Menu Header - Redesigned */}
					<div className="flex-shrink-0 pt-12 pb-4 px-6"></div>{" "}
					{/* Navigation Items */}
					<div className="flex-1 overflow-y-auto py-6">
						<nav className="px-6 space-y-3">{children}</nav>
					</div>{" "}
					{/* Logout Button */}
					<div className="flex-shrink-0 p-6 border-t border-gray-800">
						<button
							onClick={handleLogout}
							className="w-full py-3 px-4 text-sm font-medium text-red-400 bg-red-900/20 border border-red-800/50 rounded-lg hover:bg-red-900/30 hover:border-red-700 transition-colors duration-200 flex items-center justify-center gap-2"
						>
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
								/>
							</svg>
							Logout
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
