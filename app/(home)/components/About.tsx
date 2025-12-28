"use client";
import Link from "next/link";

export default function About() {
	return (
		<section id="about" className="py-16 md:py-28 bg-neutral-700/80">
			<div className="container mx-auto px-6">
				<div className="max-w-3xl mx-auto text-center">
					<h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
						About Us
					</h2>
					<p className="text-base md:text-lg text-slate-300 leading-relaxed">
						Coreflex Pilates Studio is a movement-led wellness space
						focused on core health, strength, stability, and
						pain-free movement — guiding bodies through every stage
						of life.
					</p>
				</div>
			</div>
		</section>
	);
}
