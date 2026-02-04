"use client";
import Link from "next/link";

// Image placeholders - replace src values with your actual image paths
const PILATES_CLASSES = [
	{
		name: "Reformer",
		imageSrc: "/images/our_classes/pilates/reformer.jpg",
	},
	{
		name: "Mat",
		imageSrc: "/images/our_classes/pilates/mat.jpg",
	},
	{
		name: "Chair | Wall",
		imageSrc: "/images/our_classes/pilates/wall.jpg",
	},
	{
		name: "Barre | Core | Sculpt",
		imageSrc: "/images/our_classes/pilates/barre.jpg",
	},
];

const YOGA_CLASSES = [
	{
		name: "Aerial",
		imageSrc: "/images/our_classes/yoga/aerial.jpg",
	},
	{
		name: "Iyengar-Inspired Rope & Chair",
		imageSrc: "/images/our_classes/yoga/chair_.jpg",
	},
	{
		name: "Ashtanga",
		imageSrc: "/images/our_classes/yoga/ashthanga.jpg",
	},
	{
		name: "Chakra & Mobility",
		imageSrc: "/images/our_classes/yoga/chakra.jpg",
	},
	{
		name: "Mat Yoga",
		imageSrc: "/images/our_classes/yoga/mat.jpg"
	},
	{
		name: "Rope Yoga",
		imageSrc: "/images/our_classes/yoga/rope.jpg"
	}
];

const TRAINING_CLASSES = [
	{
		name: "Strength",
		imageSrc: "/images/our_classes/strength/strength.jpg",
	},
	{
		name: "EMS (Electric Muscle Stimulation)",
		imageSrc: "/images/our_classes/strength/ems.jpg",
	},
	{
		name: "Sports Performance Enhancement",
		imageSrc: "/images/our_classes/strength/sports.jpg",
	},
	{
		name: "Rehabilitation & Pelvic Floor Work",
		imageSrc: "/images/our_classes/strength/pelvic_floor.jpg",
	},
];

export default function Offers() {
	return (
		<section id="offers" className="py-16 md:py-28 bg-yellow-600/20">
			<div className="container mx-auto ">
				<div className=" mx-auto">
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
						<div className="flex flex-wrap md:flex-nowrap justify-center gap-8 md:gap-12 max-w-3xl mx-auto">
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
						<div className="flex flex-wrap justify-center gap-8 md:gap-12 max-w-2xl mx-auto">
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
