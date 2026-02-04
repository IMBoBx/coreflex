"use client";
import { useState } from "react";

// Image placeholders - replace imageSrc with your actual image paths
const AUDIENCES = [
	{
		label: "Teens",
		imageSrc: "/studio.png",
	},
	{
		label: "Beginners & First-Timers",
		imageSrc: "/images/for_who/beginners.jpg",
	},
	{
		label: "Pre & Post-Natal Clients",
		imageSrc: "",
	},
	{
		label: "Athletes & Sports Performance",
		imageSrc: "/images/for_who/athletes.jpg",
	},
	{
		label: "Seniors (Pelvic Rehab & Rebuilding)",
		imageSrc: "",
	},
	{
		label: "Adults & Working Professionals",
		imageSrc: "/images/for_who/working_professionals.jpg",
	},
];

export default function ForWho() {
	const [currentIndex, setCurrentIndex] = useState(0);

	const goToPrevious = () => {
		setCurrentIndex((prev) =>
			prev === 0 ? AUDIENCES.length - 1 : prev - 1
		);
	};

	const goToNext = () => {
		setCurrentIndex((prev) =>
			prev === AUDIENCES.length - 1 ? 0 : prev + 1
		);
	};

	const currentAudience = AUDIENCES[currentIndex];

	return (
		<section id="for-who" className="py-16 md:py-20 bg-neutral-700/80">
			<div className="container mx-auto px-6">
				<div className="max-w-5xl mx-auto">
					<h2 className="text-3xl md:text-5xl font-bold text-white mb-3 text-center">
						We Work With Everyone
					</h2>
					<p className="text-base md:text-lg text-slate-300 mb-10 md:mb-12 text-center">
						Movement for every body, every stage of life.
					</p>

					{/* Slideshow Container */}
					<div className="relative">
						{/* Main Card */}
						<div className="relative overflow-hidden rounded-2xl bg-slate-200 aspect-[3/4] md:aspect-[16/9] shadow-xl max-w-xl md:max-w-4xl mx-auto">
							{/* Background Image */}
							<div
								className="absolute inset-0 bg-cover bg-center transition-all duration-500"
								style={{
									backgroundImage: currentAudience.imageSrc
										? `url('${currentAudience.imageSrc}')`
										: "none",
								}}
							>
								{/* Placeholder if no image */}
								{!currentAudience.imageSrc && (
									<div className="absolute inset-0 flex items-center justify-center">
										<span className="text-8xl opacity-10">
											📷
										</span>
									</div>
								)}
							</div>

							{/* Gradient Overlay */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

							{/* Text Content */}
							<div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
								<h3 className="text-2xl md:text-4xl font-bold text-white leading-tight">
									{currentAudience.label}
								</h3>
							</div>

							{/* Navigation Arrows */}
							<button
								onClick={goToPrevious}
								className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-900 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
								aria-label="Previous audience"
							>
								<svg
									className="w-5 h-5 md:w-6 md:h-6"
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
								className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-900 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
								aria-label="Next audience"
							>
								<svg
									className="w-5 h-5 md:w-6 md:h-6"
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
						<div className="flex justify-center gap-2 mt-6">
							{AUDIENCES.map((_, idx) => (
								<button
									key={idx}
									onClick={() => setCurrentIndex(idx)}
									className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
										idx === currentIndex
											? "bg-slate-900 w-8"
											: "bg-slate-300 hover:bg-slate-400"
									}`}
									aria-label={`Go to audience ${idx + 1}`}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
