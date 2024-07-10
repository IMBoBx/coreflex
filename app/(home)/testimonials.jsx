import TestimonialCard from "@/app/ui/testimonialCard";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { josefinSans, stickNoBills, urbanist } from "../fonts";

const _urbanist = urbanist.className;

const reviews = [
    [
        "Sarika Dhawan", 
        "I feel immensely contentment when I spend my time at Coreflex Studio. Whether it is yoga sessions or pilates or aerial yoga, we are always being guided properly by instructors. They focus on physical health as well as mental fitness. The core strengthening sessions with Himanya are amazing.",
    ], 
    [
        "Aashana Dhingra",
        "I have been to many workout centres and I can say this with confidence that this one changed a lot for me for good. I love the fact that CoreFlex focuses on strengthening and long-term fixing of body issues resulting in changes that make you feel better - both inside out. Himanya and other instructors are so patient and amazing at what they do - you just need to believe they know well and trust the process with them. I highly recommend CoreFlex if you want to start your positive fitness journey!"
    ],
    [
        "Neha Ahuja",
        "I was thrilled to know that a Pilates and Aerial Yoga studio space has opened in Rajouri Garden. And it was a delight to have the first class with Himanya. She lets you flow into each pose of yoga and Pilates with such ease and always wants you to do better while correcting the poses. She is really knowledgeable and very humble as a person too. As far as the studio space is concerned, it is well lit, the equipments are cleaned and sanitised after every class. I am hooked to it."
    ],
    [
        "Rhythm Arora",
        "Coreflex Pilates with Himanya is fantastic. She brings energy, expertise, and personalized attention to each session. The sessions are diverse and effective, ensuring every class feels fresh and engaging. The positive atmosphere she cultivates makes the experience truly enjoyable. Highly recommended for improving strength, flexibility, and overall well-being!"
    ]
]

export default function Testimonials() {
    return (
        <section id="testimonialSection" className="text-center py-7 bg-black text-lavender-bush">
            <h2 className={_urbanist + " md:pt-8 md:pb-12 max-w-[90%] mx-auto underline underline-offset-8 "}>Hear From Our Clients</h2>
            <ScrollShadow className="testimonialContainer container mx-auto flex flex-wrap justify-around overflow-y-auto max-h-[calc(100%-6.5rem)]" hideScrollBar> 
                {
                    reviews.map(review => (
                        <TestimonialCard key={review[0]} name={review[0]} description={review[1]} />
                    ))
                }
            </ScrollShadow>
        </section>
    )
}