"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const closeMenu = () => {
		setIsOpen(false);
	};

	const handleNavClick = (
		e: React.MouseEvent<HTMLAnchorElement>,
		href: string
	) => {
		if (href.startsWith("#")) {
			e.preventDefault();
			const element = document.querySelector(href);
			if (element) {
				element.scrollIntoView({ behavior: "smooth", block: "start" });
				closeMenu();
			}
		}
	};

	const navLinks = [
		{ label: "Classes", href: "#classes" },
		{ label: "About", href: "#about" },
		{ label: "Testimonials", href: "#testimonials" },
		{ label: "Contact", href: "#contact" },
	];

	const whatsappLink =
		"https://wa.me/+919911775563/?text=Hi! I want to book a trial session.";

	return (
		<nav className="fixed top-0 left-0 right-0 z-[9999] px-3 pt-2 md:pt-2 transition-all duration-300">
			<div className="mx-auto max-w-7xl">
				<div
					className={`backdrop-blur-xl border shadow-lg transition-all duration-300 ${
						scrolled
							? "bg-white/95 border-slate-200"
							: "bg-white/70 border-white/30"
					} rounded-xl`}
				>
					<div className="flex items-center justify-between px-4 md:px-6 py-0.5 md:py-0.5">
						{/* Logo */}
						<Link
							href="/"
							className="flex items-center flex-shrink-0 lg:w-auto w-full justify-center lg:justify-start absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0"
						>
							<Image
								src="/logo.svg"
								alt="Coreflex Logo"
								width={200}
								height={52}
								className="h-10 md:h-16 w-auto"
								priority
							/>
						</Link>

						{/* Desktop Navigation */}
						<div className="hidden lg:flex items-center gap-1 mx-auto">
							{navLinks.map((link) => (
								<a
									key={link.href}
									href={link.href}
									onClick={(e) => handleNavClick(e, link.href)}
									className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all duration-200 cursor-pointer"
								>
									{link.label}
								</a>
							))}
						</div>

						{/* Desktop CTA Buttons */}
						<div className="hidden lg:flex items-center gap-2">
							<Link
								href="/login"
								className="px-5 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all duration-200"
							>
								Login
							</Link>
							<a
								href={whatsappLink}
								target="_blank"
								rel="noopener noreferrer"
								className="px-5 py-2 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
							>
								Book Trial
							</a>
						</div>

						{/* Mobile Menu Button */}
						<button
							onClick={toggleMenu}
							className="lg:hidden p-1.5 hover:bg-slate-100 rounded-lg transition-colors duration-200 flex-shrink-0 relative z-10"
							aria-label="Toggle navigation menu"
						>
							<div className="w-5 h-5 flex flex-col justify-center items-center">
								<span
									className={`block h-0.5 w-5 bg-slate-900 rounded-sm transition-all duration-300 ${
										isOpen
											? "rotate-45 translate-y-[0.35rem]"
											: "-translate-y-1"
									}`}
								></span>
								<span
									className={`block h-0.5 w-5 bg-slate-900 rounded-sm my-0.5 transition-all duration-300 ${
										isOpen ? "opacity-0" : "opacity-100"
									}`}
								></span>
								<span
									className={`block h-0.5 w-5 bg-slate-900 rounded-sm transition-all duration-300 ${
										isOpen
											? "-rotate-45 -translate-y-[0.35rem]"
											: "translate-y-1"
									}`}
								></span>
							</div>
						</button>
					</div>

					{/* Mobile Menu */}
					{isOpen && (
						<div className="lg:hidden border-t border-slate-200">
							<div className="flex flex-col px-3 py-3 gap-1">
								{navLinks.map((link) => (
									<a
										key={link.href}
										href={link.href}
										onClick={(e) => handleNavClick(e, link.href)}
										className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all duration-200 cursor-pointer"
									>
										{link.label}
									</a>
								))}
								<div className="flex flex-col gap-2 pt-2 mt-2 border-t border-slate-200">
									<Link
										href="/login"
										onClick={closeMenu}
										className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all duration-200"
									>
										Login
									</Link>
									<a
										href={whatsappLink}
										target="_blank"
										rel="noopener noreferrer"
										onClick={closeMenu}
										className="px-3 py-2 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 text-white text-sm font-semibold rounded-lg text-center shadow-md transition-all duration-200"
									>
										Book Trial
									</a>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
}
