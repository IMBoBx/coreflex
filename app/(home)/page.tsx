"use client";
import About from "./components/About";
import Offers from "./components/Offers";
import ForWho from "./components/ForWho";
import FounderTeaser from "./components/FounderTeaser";
import CommunityCTA from "./components/CommunityCTA";
import Hero from "./components/Hero";
import Contact from "./components/Contact";
import CTABanner from "./components/CTABanner";
import Testimonials from "./components/Testimonials";

export default function Home() {
	return (
		<>
			<Hero />

			{/* Section components */}
			<About />
			<Offers />
			<CTABanner />
			<FounderTeaser />
			<ForWho />
			{/* <CommunityCTA /> */}
			<Testimonials />
			<Contact />

			{/* Footer */}
			<footer className="bg-slate-800 text-white py-8">
				<div className="container mx-auto px-6 text-center">
					<p className="text-slate-400">
						© 2025 Coreflex Pilates Studio. All rights reserved.
					</p>
				</div>
			</footer>
		</>
	);
}
