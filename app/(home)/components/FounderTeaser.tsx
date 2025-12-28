"use client";
import Link from "next/link";

// EDIT IMAGE PATH HERE
let FOUNDER_IMAGE = "pilateswithhimanya.jpg";
export default function FounderTeaser() {
	return (
		<section id="founder" className="py-16 md:py-28 bg-yellow-600/20">
			<div className="container mx-auto px-6">
				<div className="max-w-5xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
						<div className="order-2 md:order-1">
							<div
								className="relative aspect-square bg-cover bg-center rounded-2xl overflow-hidden flex items-center justify-center"
								style={{
									backgroundImage: `url('${FOUNDER_IMAGE}')`,
									backgroundColor: "rgb(226, 232, 240)",
								}}
							>
								{!FOUNDER_IMAGE ||
								FOUNDER_IMAGE ===
									"/images/founder-himanya.jpg" ? (
									<div className="text-center">
										<svg
											className="w-16 h-16 md:w-20 md:h-20 text-slate-400 mx-auto mb-3"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={1.5}
												d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
										<p className="text-sm md:text-base text-slate-500">
											Founder image
										</p>
									</div>
								) : null}
							</div>
						</div>

						<div className="order-1 md:order-2">
							<h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
								Meet Himanya
							</h2>
							<p className="text-base md:text-lg text-slate-700 leading-relaxed font-semibold mb-4">
								Founder & Head Instructor
							</p>
							<p className="text-sm md:text-base text-slate-600 leading-relaxed mb-8">
								A movement specialist with deep expertise in
								alignment, breathwork, posture, and long-term
								strength. Himanya founded Coreflex to create a
								space where movement serves the whole person—not
								just aesthetics, but true, functional wellness.
							</p>
							<Link
								href="/about#founder"
								className="inline-block px-6 md:px-8 py-3 md:py-4 bg-slate-900 text-white rounded-full font-semibold text-sm md:text-base hover:bg-slate-800 transition-colors duration-300 shadow-lg hover:shadow-xl"
							>
								Learn Her Story
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
