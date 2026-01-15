"use client";

const TESTIMONIALS = [
	{
		name: "Priya Sharma",
		role: "Software Engineer",
		text: "CoreFlex has completely transformed my approach to fitness. The reformer classes are challenging yet rewarding, and I've seen incredible improvements in my core strength and posture.",
		rating: 5,
	},
	{
		name: "Rajesh Kumar",
		role: "Business Owner",
		text: "After years of back pain, the rehabilitation sessions here have been life-changing. The instructors are knowledgeable and create personalized programs that actually work.",
		rating: 5,
	},
	{
		name: "Ananya Patel",
		role: "Yoga Instructor",
		text: "The aerial yoga classes are my favorite! The studio has a welcoming atmosphere and the attention to detail in every session is remarkable. Highly recommend!",
		rating: 5,
	},
	{
		name: "Vikram Singh",
		role: "Marathon Runner",
		text: "The sports performance enhancement program helped me improve my running form and prevent injuries. The combination of strength training and Pilates is perfect for athletes.",
		rating: 5,
	},
	{
		name: "Meera Reddy",
		role: "New Mother",
		text: "The pelvic floor work and postnatal programs have been incredible. The instructors are compassionate and understanding, making my fitness journey post-pregnancy smooth and effective.",
		rating: 5,
	},
	{
		name: "Arjun Mehta",
		role: "Corporate Professional",
		text: "I was skeptical about Pilates at first, but CoreFlex changed my mind completely. The mat and wall classes have improved my flexibility and reduced my stress levels significantly.",
		rating: 5,
	},
];

export default function Testimonials() {
	return (
		<section id="testimonials" className="py-16 md:py-28 bg-yellow-600/20">
			<div className="container mx-auto px-6">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-12 md:mb-16">
						<h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-3 md:mb-4">
							Hear from Our Clients
						</h2>
						<p className="text-base md:text-lg text-slate-600">
							Real stories from people who've transformed their
							wellness journey with us.
						</p>
					</div>

					{/* Mobile: Horizontal Scroll Carousel */}
					<div className="md:hidden overflow-x-auto scrollbar-hide -mx-6 px-6">
						<div className="flex gap-4 pb-4">
							{TESTIMONIALS.map((testimonial, idx) => (
								<div
									key={idx}
									className="flex-shrink-0 w-[85vw] max-w-sm bg-white p-6 rounded-xl shadow-sm border border-slate-200"
								>
									{/* Rating Stars */}
									<div className="flex gap-1 mb-4">
										{[...Array(testimonial.rating)].map(
											(_, i) => (
												<svg
													key={i}
													className="w-5 h-5 text-yellow-500"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
												</svg>
											)
										)}
									</div>

									{/* Testimonial Text */}
									<p className="text-slate-700 text-sm leading-relaxed mb-6">
										"{testimonial.text}"
									</p>

									{/* Author Info */}
									<div className="border-t border-slate-200 pt-4">
										<p className="font-semibold text-slate-900 text-base">
											{testimonial.name}
										</p>
										<p className="text-slate-600 text-sm">
											{testimonial.role}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Desktop: Grid Layout */}
					<div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
						{TESTIMONIALS.map((testimonial, idx) => (
							<div
								key={idx}
								className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-lg transition-shadow duration-300"
							>
								{/* Rating Stars */}
								<div className="flex gap-1 mb-4">
									{[...Array(testimonial.rating)].map(
										(_, i) => (
											<svg
												key={i}
												className="w-5 h-5 text-yellow-500"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
											</svg>
										)
									)}
								</div>

								{/* Testimonial Text */}
								<p className="text-slate-700 text-sm md:text-base mb-6 leading-relaxed">
									"{testimonial.text}"
								</p>

								{/* Author Info */}
								<div className="border-t border-slate-200 pt-4">
									<p className="font-semibold text-slate-900 text-base">
										{testimonial.name}
									</p>
									<p className="text-slate-600 text-sm">
										{testimonial.role}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
