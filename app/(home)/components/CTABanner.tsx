"use client";
import Link from "next/link";

// EDIT BACKGROUND IMAGE PATH HERE
const CTA_BACKGROUND_IMAGE = "/wall-text-collage.jpeg";

export default function CTABanner() {
	return (
		<section
			id="cta-banner"
			className="relative py-24 md:py-36 bg-slate-400 overflow-hidden"
		>
			{/* Background image with blur */}
			<div
				className="absolute inset-0 bg-cover bg-top blur-xs scale-105"
				style={{
					backgroundImage: CTA_BACKGROUND_IMAGE
						? `url('${CTA_BACKGROUND_IMAGE}')`
						: "none",
				}}
			></div>

			{/* Overlay for better text readability */}
			<div className="absolute inset-0 bg-black/50"></div>

			<div className="container mx-auto px-6 relative z-10">
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="text-3xl md:text-5xl font-bold text-white mb-6 md:mb-8">
						Ready to Start?
					</h2>
					<p className="text-base md:text-xl text-white/90 mb-10 md:mb-12 max-w-2xl mx-auto">
						Join us for a trial session and experience movement that
						transforms.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center items-center">
						<Link
							href="/book"
							className="inline-block px-10 md:px-12 py-4 md:py-4 bg-white text-slate-900 rounded-full font-semibold text-base md:text-lg hover:bg-slate-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 text-center min-w-[200px]"
						>
							Book a Trial
						</Link>
						<Link
							href="/schedule"
							className="inline-block px-10 md:px-12 py-4 md:py-4 bg-transparent text-white rounded-full font-semibold text-base md:text-lg hover:bg-white hover:text-slate-900 transition-all duration-300 border-2 border-white text-center min-w-[200px]"
						>
							View Schedule
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
