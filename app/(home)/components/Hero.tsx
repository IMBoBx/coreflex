"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

type Slide = {
	id: string;
	image: string;
	headline: string;
	subtext: string;
	primaryCta?: { label: string; href: string };
	secondaryCta?: { label: string; href: string };
};

const SLIDES: Slide[] = [
	{
		id: "slide-1",
		image: "/studio-compressed.jpg",
		headline: "Welcome to Coreflex Pilates Studio",
		subtext:
			"Pilates, yoga & movement therapy designed to support real bodies and real goals.",
		primaryCta: { label: "Book a Trial", href: "/book" },
		secondaryCta: { label: "View Schedule", href: "/schedule" },
	},
	{
		id: "slide-2",
		image: "/reformer.jpg",
		headline: "Reformer Pilates for meaningful strength",
		subtext:
			"Guided reformer sessions focused on alignment, breath and long-term resilience.",
		primaryCta: { label: "Explore Reformer", href: "/classes#reformer" },
	},
	{
		id: "slide-3",
		image: "/aerial.jpg",
		headline: "Move freely — aerial yoga and mobility",
		subtext: "Rediscover range of motion with safe, supported aerial work.",
		primaryCta: { label: "See Classes", href: "/classes#yoga" },
	},
];

export default function Hero() {
	const [index, setIndex] = useState(0);
	const timeoutRef = useRef<number | null>(null);

	// initialize from URL hash if present
	useEffect(() => {
		const hash = window.location.hash.replace("#", "");
		if (hash) {
			const found = SLIDES.findIndex((s) => s.id === hash);
			if (found >= 0) setIndex(found);
		}
	}, []);

	useEffect(() => {
		// auto-advance every 6s
		if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
		timeoutRef.current = window.setTimeout(() => {
			setIndex((i) => (i + 1) % SLIDES.length);
		}, 6000);
		return () => {
			if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
		};
	}, [index]);

	function goTo(i: number) {
		const next = ((i % SLIDES.length) + SLIDES.length) % SLIDES.length;
		setIndex(next);
		// update URL hash so slides are linkable, but don't cause scroll
		try {
			const newHash = `#${SLIDES[next].id}`;
			if (window.history && window.history.replaceState) {
				window.history.replaceState(null, "", newHash);
			} else {
				// fallback
				window.location.hash = SLIDES[next].id;
			}
		} catch (e) {
			// ignore
		}
	}

	return (
		<section className="relative min-h-screen overflow-hidden bg-black">
			{/* Slides container */}
			<div className="relative w-full h-screen">
				{SLIDES.map((s, i) => (
					<div
						key={s.id}
						className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
							i === index
								? "opacity-100"
								: "opacity-0 pointer-events-none"
						}`}
						style={{
							backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${s.image}')`,
						}}
					>
						<div className="container mx-auto px-6 h-full flex flex-col justify-center text-center text-white">
							<h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
								{s.headline}
							</h1>
							<p className="text-sm md:text-lg mb-8 max-w-2xl mx-auto font-light">
								{s.subtext}
							</p>

							<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
								{s.primaryCta && (
									<Link
										href={s.primaryCta.href}
										className="bg-white text-slate-800 hover:bg-slate-100 transition-all duration-300 px-6 py-3 rounded-full font-semibold text-sm md:text-lg shadow-lg hover:shadow-xl"
									>
										{s.primaryCta.label}
									</Link>
								)}
								{s.secondaryCta && (
									<Link
										href={s.secondaryCta.href}
										className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-800 transition-colors duration-300 px-6 py-3 rounded-full font-semibold text-sm md:text-lg"
									>
										{s.secondaryCta.label}
									</Link>
								)}
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Pagination dots - separate layer */}
			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-50">
				{SLIDES.map((_, i) => (
					<button
						key={i}
						type="button"
						onClick={() => goTo(i)}
						aria-label={`Go to slide ${i + 1}`}
						className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-200 cursor-pointer hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white ${
							i === index
								? "bg-rose-600 shadow-lg"
								: "bg-white/50 hover:bg-white/70"
						}`}
					/>
				))}
			</div>
		</section>
	);
}
