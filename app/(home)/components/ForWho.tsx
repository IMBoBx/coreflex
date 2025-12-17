"use client";

const AUDIENCES = [
	"Beginners & first-timers",
	"Teens",
	"Adults & working professionals",
	"Seniors (pelvic rehab & rebuilding)",
	"Pre & post-natal clients",
	"Athletes & sports performance",
];

export default function ForWho() {
	return (
		<section id="for-who" className="py-16 md:py-28 bg-white">
			<div className="container mx-auto px-6">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-3 text-center">
						We Work With Everyone
					</h2>
					<p className="text-base md:text-lg text-slate-600 mb-10 md:mb-12 text-center">
						Movement for every body, every stage of life.
					</p>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
						{AUDIENCES.map((aud) => (
							<div
								key={aud}
								className="flex items-center p-4 md:p-5 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-white transition-all duration-200"
							>
								<div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-slate-900 flex-shrink-0 mr-4" />
								<span className="text-sm md:text-base text-slate-800 font-medium">
									{aud}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
