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
		image: "studio-compressed.jpg",
		headline: "Welcome to Coreflex Pilates Studio",
		subtext:
			"Pilates, yoga & movement therapy designed to support real bodies and real goals.",
		primaryCta: { label: "Book a Trial", href: "/book" },
		secondaryCta: { label: "View Schedule", href: "/schedule" },
	},
	{
		id: "slide-2",
		image: "/images/hero_banner/hero_banner_2.jpg",
		headline: "Reformer Pilates for meaningful strength",
		subtext:
			"Guided reformer sessions focused on alignment, breath and long-term resilience.",
		// primaryCta: { label: "Explore Reformer", href: "/classes#reformer" },
	},
	{
		id: "slide-3",
		image: "/images/hero_banner/hero_banner_3.jpg",
		headline: "Move freely — aerial yoga and mobility",
		subtext: "Rediscover range of motion with safe, supported aerial work.",
		// primaryCta: { label: "See Classes", href: "/classes#yoga" },
	},
];

export default function Hero() {
	const [index, setIndex] = useState(0);
	const timeoutRef = useRef<number | null>(null);

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
	}

	function goToPrevious() {
		goTo(index - 1);
	}

	function goToNext() {
		goTo(index + 1);
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
						<div className="container mx-auto px-6 md:px-12 h-full flex flex-col justify-center text-center text-white">
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 px-12 md:px-0">
								{s.headline}
							</h1>
							<p className="text-base md:text-lg mb-8 max-w-2xl mx-auto font-light px-12 md:px-0">
								{s.subtext}
							</p>

							<div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-12 md:px-0">
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

				{/* Navigation Arrows */}
				<button
					onClick={goToPrevious}
					className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-900 w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 z-50"
					aria-label="Previous slide"
				>
					<svg
						className="w-4 h-4 md:w-6 md:h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2.5}
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>
				<button
					onClick={goToNext}
					className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-900 w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 z-50"
					aria-label="Next slide"
				>
					<svg
						className="w-4 h-4 md:w-6 md:h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2.5}
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</button>
			</div>

			{/* Dot Indicators */}
			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-50">
				{SLIDES.map((_, i) => (
					<button
						key={i}
						type="button"
						onClick={() => goTo(i)}
						aria-label={`Go to slide ${i + 1}`}
						className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
							i === index
								? "bg-rose-600 w-8"
								: "bg-white/50 hover:bg-white/70"
						}`}
					/>
				))}
			</div>
		</section>
	);
}
