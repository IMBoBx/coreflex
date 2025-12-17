"use client";
import Link from "next/link";

const OFFER_ITEMS = [
	{
		name: "Reformer Pilates",
		desc: "Precision-focused work on our equipment for deep core engagement.",
	},
	{
		name: "Mat, Wall & Chair Pilates",
		desc: "Bodyweight and prop-based sequences for accessibility and strength.",
	},
	{
		name: "Aerial Yoga",
		desc: "Suspended practice for spinal decompression and ease of movement.",
	},
	{
		name: "Strength & Conditioning",
		desc: "Functional training to build resilience and athletic performance.",
	},
	{
		name: "Mobility & Rehabilitation",
		desc: "Therapeutic movement to restore range, reduce pain, rebuild function.",
	},
	{
		name: "Specialised & Personalised Programs",
		desc: "One-on-one or small-group training tailored to your goals.",
	},
];

export default function Offers() {
	return (
		<section id="offers" className="py-16 md:py-28 bg-slate-50">
			<div className="container mx-auto px-6">
				<div className="max-w-5xl mx-auto">
					<div className="text-center mb-12 md:mb-16">
						<h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-3 md:mb-4">
							What We Offer
						</h2>
						<p className="text-base md:text-lg text-slate-600">
							Movement modalities designed to meet you where you
							are.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
						{OFFER_ITEMS.map((item) => (
							<div
								key={item.name}
								className="p-5 md:p-7 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300"
							>
								<div className="flex items-start gap-4">
									<div className="flex-shrink-0 w-11 h-11 md:w-12 md:h-12 bg-slate-900 text-white rounded-lg flex items-center justify-center">
										<svg
											className="w-5 h-5 md:w-6 md:h-6"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M13 10V3L4 14h7v7l9-11h-7z"
											/>
										</svg>
									</div>
									<div className="flex-1 min-w-0">
										<h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2">
											{item.name}
										</h3>
										<p className="text-sm md:text-base text-slate-600 leading-relaxed">
											{item.desc}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>

					<div className="text-center">
						<Link
							href="/classes"
							className="inline-block px-6 md:px-8 py-3 md:py-4 bg-slate-900 text-white rounded-full font-semibold text-sm md:text-base hover:bg-slate-800 transition-colors duration-300 shadow-lg hover:shadow-xl"
						>
							Explore All Classes
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
