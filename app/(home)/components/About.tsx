"use client";
import Link from "next/link";

export default function About() {
	return (
		<section id="about" className="py-20 md:py-28 bg-white">
			<div className="container mx-auto px-6">
				<div className="max-w-3xl mx-auto text-center">
					<h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
						Coreflex Pilates Studio
					</h2>
					<p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-12">
						A movement-led wellness space focused on core health,
						strength, stability, and pain-free movement — guiding
						bodies through every stage of life.
					</p>
					<Link
						href="/about"
						className="inline-block px-8 py-4 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800 transition-colors duration-300 shadow-lg hover:shadow-xl"
					>
						Read Our Story
					</Link>
				</div>
			</div>
		</section>
	);
}
