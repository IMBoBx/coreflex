"use client";
import { Image } from "@nextui-org/image";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import NextImage from "next/image";

import { josefinSans, stickNoBills, urbanist, manrope } from "../fonts";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

const _josefinSans = josefinSans.className;
const _urbanist = urbanist.className;
const _stickNoBills = stickNoBills.className;
const _manrope = manrope.className;

export default function ExplorePrograms() {

    const accordionClasses = {
        title: "text-lavender-bush h5 " + _manrope,
        indicator: "md:scale-[.3] scale-[.4]",
        content: "text-lavender-bush text-left text-lg md:text-xl " + _manrope
    };

    return (
        <section id="explore" className=" bg-black text-lavender-bush ">
            <h2 className={_urbanist + " sectionHeader py-5 md:my-auto"}>What We Offer</h2>
            <h3 className={_josefinSans + " mb-5 md:my-auto"}>Pilates</h3>
            <div className="programContainer">
                <div className="programImagesContainer overflow-y-hidden md:h-[50vh] h-[40vh]">
                    <div className="flex flex-col gap-0 transition-all duration-300">
                        <Image 
                            src="/choosePilatesMobile.jpg"
                            alt=""
                            className="h-[30vh] md:h-[50vh] w-[100%] object-cover"    
                        />
                        <Image 
                            src="/chooseYogaMobile.jpg"
                            alt=""
                            className="h-[30vh] md:h-[50vh] w-[100%] object-cover"    
                        />
                    </div>
                </div>
                <div className="programAccordionContainer container mx-auto w-full md:w-[50%] text-lavender-bush md:h-[60vh] overflow-y-scroll flex flex-col" >
                    <ScrollShadow hideScrollBar>
                        <Accordion itemClasses={accordionClasses} showDivider={false} className="py-16">
                            <AccordionItem aria-label="Reformer Pilates" title="Reformer Pilates">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quos facilis fugiat assumenda quibusdam amet optio magni. Nihil, quae laboriosam incidunt quam est aliquam non explicabo ut magnam quod distinctio?
                            </AccordionItem>
                            <AccordionItem aria-label="Mat Pilates" title="Mat Pilates">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque consectetur fugit, excepturi numquam recusandae a harum quibusdam blanditiis dolor doloribus tempora cupiditate voluptatem nostrum praesentium nesciunt corporis, qui repudiandae nisi.
                            </AccordionItem>
                            <AccordionItem aria-label="Barre Pilates" title="Barre Pilates">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus corrupti rem repellat explicabo corporis quam voluptatem eum. Esse ad ut ipsam dolor maiores quia illo. Quia fugit sequi quibusdam at!
                            </AccordionItem>
                        </Accordion>
                    </ScrollShadow>
                </div>
            </div>
        </section>
    )
}