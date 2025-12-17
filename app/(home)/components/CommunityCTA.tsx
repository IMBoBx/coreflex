"use client";
import Link from "next/link";

// EDIT IMAGE PATHS HERE
const COMMUNITY_IMAGES = [
	"/images/community-01.jpg",
	"/images/community-02.jpg",
	"/images/community-03.jpg",
	"/images/community-04.jpg",
];

export default function CommunityCTA() {
	return (
		<section id="community" className="py-16 md:py-28 bg-white">
			<div className="container mx-auto px-6">
				<div className="max-w-5xl mx-auto">
					<div className="text-center mb-10 md:mb-14">
						<h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
							Join the Community
						</h2>
						<p className="text-base md:text-lg text-slate-600 leading-relaxed">
							Real stories from real people. See how Coreflex
							members are moving stronger, feeling better, and
							building sustainable wellness.
						</p>
					</div>

					{/* Community gallery */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-12">
						{COMMUNITY_IMAGES.map((img, i) => (
							<div
								key={i}
								className="aspect-square bg-slate-200 rounded-lg overflow-hidden flex items-center justify-center"
								style={{
									backgroundImage: `url('${img}')`,
									backgroundSize: "cover",
									backgroundPosition: "center",
								}}
							>
								<div className="text-center text-slate-400">
									<svg
										className="w-8 h-8 md:w-10 md:h-10 mx-auto"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={1.5}
											d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
										/>
									</svg>
								</div>
							</div>
						))}
					</div>

					<div className="text-center flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
						<Link
							href="/community"
							className="inline-block px-6 md:px-8 py-3 md:py-4 bg-slate-900 text-white rounded-full font-semibold text-sm md:text-base hover:bg-slate-800 transition-colors duration-300 shadow-lg hover:shadow-xl order-2 sm:order-1"
						>
							Explore Stories
						</Link>
						<Link
							href="/book"
							className="inline-block px-6 md:px-8 py-3 md:py-4 bg-white border-2 border-slate-900 text-slate-900 rounded-full font-semibold text-sm md:text-base hover:bg-slate-50 transition-colors duration-300 order-1 sm:order-2"
						>
							Book First Session
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
