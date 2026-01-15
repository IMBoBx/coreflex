"use client";
import Link from "next/link";

// Image placeholders - replace src values with your actual image paths
const PILATES_CLASSES = [
	{
		name: "Reformer",
		imageSrc: "",
	},
	{
		name: "Mat | Wall | Chair",
		imageSrc: "",
	},
	{
		name: "Barre | Core | Sculpt",
		imageSrc: "",
	},
];

const YOGA_CLASSES = [
	{
		name: "Aerial",
		imageSrc: "",
	},
	{
		name: "Iyengar-Inspired Rope & Chair",
		imageSrc: "",
	},
	{
		name: "Ashtanga",
		imageSrc: "",
	},
	{
		name: "Chakra & Mobility",
		imageSrc: "",
	},
];

const TRAINING_CLASSES = [
	{
		name: "Strength",
		imageSrc: "",
	},
	{
		name: "EMS (Electric Muscle Stimulation)",
		imageSrc: "",
	},
	{
		name: "Sports Performance Enhancement",
		imageSrc: "",
	},
	{
		name: "Rehabilitation & Pelvic Floor Work",
		imageSrc: "",
	},
];

export default function Offers() {
	return (
		<section id="offers" className="py-16 md:py-28 bg-yellow-600/20">
			<div className="container mx-auto px-6">
				<div className="max-w-5xl mx-auto">
					<div className="text-center mb-12 md:mb-16">
						<h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-3 md:mb-4">
							Our Classes
						</h2>
						<p className="text-base md:text-lg text-slate-600">
							Movement modalities designed to meet you where you
							are.
						</p>
					</div>

					{/* PILATES Section */}
					<div className="mb-16 md:mb-20">
						<h3 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-10 md:mb-12">
							Pilates
						</h3>
						<div className="flex flex-wrap justify-center gap-8 md:gap-12 max-w-3xl mx-auto">
							{PILATES_CLASSES.map((item, idx) => (
								<div
									key={idx}
									className="flex flex-col items-center w-32 md:w-40"
								>
									<div className="w-full aspect-square rounded-lg overflow-hidden bg-white mb-4 md:mb-5 flex items-center justify-center shadow-sm border border-slate-200">
										{item.imageSrc ? (
											<img
												src={item.imageSrc}
												alt={item.name}
												className="w-full h-full object-cover"
											/>
										) : (
											<span className="text-4xl md:text-5xl opacity-20">
												📷
											</span>
										)}
									</div>
									<p className="text-sm md:text-base font-medium text-slate-700 text-center leading-snug whitespace-nowrap">
										{item.name}
									</p>
								</div>
							))}
						</div>
					</div>

					{/* YOGA Section */}
					<div>
						<h3 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-10 md:mb-12">
							Yoga
						</h3>
						<div className="flex flex-wrap justify-center gap-8 md:gap-12 max-w-4xl mx-auto">
							{YOGA_CLASSES.map((item, idx) => (
								<div
									key={idx}
									className="flex flex-col items-center w-32 md:w-40"
								>
									<div className="w-full aspect-square rounded-lg overflow-hidden bg-white mb-4 md:mb-5 flex items-center justify-center shadow-sm border border-slate-200">
										{item.imageSrc ? (
											<img
												src={item.imageSrc}
												alt={item.name}
												className="w-full h-full object-cover"
											/>
										) : (
											<span className="text-4xl md:text-5xl opacity-20">
												📷
											</span>
										)}
									</div>
									<p className="text-sm md:text-base font-medium text-slate-700 text-center leading-snug ">
										{item.name}
									</p>
								</div>
							))}
						</div>
					</div>

					{/* TRAINING & ENHANCEMENT Section */}
					<div className="mt-16 md:mt-20">
						<h3 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-10 md:mb-12">
							Training & Enhancement
						</h3>
						<div className="flex flex-wrap justify-center gap-8 md:gap-12 max-w-4xl mx-auto">
							{TRAINING_CLASSES.map((item, idx) => (
								<div
									key={idx}
									className="flex flex-col items-center w-32 md:w-40"
								>
									<div className="w-full aspect-square rounded-lg overflow-hidden bg-white mb-4 md:mb-5 flex items-center justify-center shadow-sm border border-slate-200">
										{item.imageSrc ? (
											<img
												src={item.imageSrc}
												alt={item.name}
												className="w-full h-full object-cover"
											/>
										) : (
											<span className="text-4xl md:text-5xl opacity-20">
												📷
											</span>
										)}
									</div>
									<p className="text-sm md:text-base font-medium text-slate-700 text-center leading-snug">
										{item.name}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
