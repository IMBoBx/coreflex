"use client";
import { Image } from "@nextui-org/image";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { useState } from "react";

import { josefinSans, stickNoBills, urbanist, manrope } from "../fonts";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

const _josefinSans = josefinSans.className;
const _urbanist = urbanist.className;
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
            <ScrollShadow className="weOfferContainer h-[80vh] overflow-auto snap" hideScrollBar isEnabled={false}>
                <div className="weOfferSection">
                    <h3 className={_josefinSans + " mb-5 md:my-auto"}>Pilates — Our Signature Class</h3>
                    <div className="programContainer">
                        <div className="programImagesContainer overflow-y-hidden md:h-[50vh] h-[40vh]">
                                <Image 
                                    src="/choosePilatesMobile.jpg"
                                    alt=""
                                    className="h-[30vh] md:h-[50vh] w-[100%] object-cover"    
                                />
                        </div>
                        <div className="programAccordionContainer container mx-auto w-full md:w-[50%] text-lavender-bush md:h-[50vh] h-[40vh] overflow-y-scroll flex flex-col" >
                            <ScrollShadow hideScrollBar>
                                <Accordion itemClasses={accordionClasses} showDivider={false} className="">
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
                </div>
                <div className="weOfferSection">
                    <h3 className={_josefinSans + " mb-5 md:my-auto"}>Yoga & Other Programs</h3>
                    <div className="programContainer">
                        <div className="programImagesContainer overflow-y-hidden md:h-[50vh] h-[40vh]">
                                <Image 
                                    src="/chooseYogaMobile.jpg"
                                    alt=""
                                    className="h-[30vh] md:h-[50vh] w-[100%] object-cover"    
                                />
                        </div>
                        <div className="programAccordionContainer container mx-auto w-full md:w-[50%] text-lavender-bush md:h-[50vh] h-[40vh] overflow-y-scroll flex flex-col" >
                            <ScrollShadow size={40}>
                                <Accordion itemClasses={accordionClasses} showDivider={false} className="">
                                    <AccordionItem aria-label="Yoga" title="Yoga">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quos facilis fugiat assumenda quibusdam amet optio magni. Nihil, quae laboriosam incidunt quam est aliquam non explicabo ut magnam quod distinctio?
                                    </AccordionItem>
                                    <AccordionItem aria-label="Aerial Yoga" title="Aerial Yoga">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque consectetur fugit, excepturi numquam recusandae a harum quibusdam blanditiis dolor doloribus tempora cupiditate voluptatem nostrum praesentium nesciunt corporis, qui repudiandae nisi.
                                    </AccordionItem>
                                    <AccordionItem aria-label="Strength Training" title="Strength Training">
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus corrupti rem repellat explicabo corporis quam voluptatem eum. Esse ad ut ipsam dolor maiores quia illo. Quia fugit sequi quibusdam at!
                                    </AccordionItem>
                                    <AccordionItem aria-label="Tabata" title="Tabata">
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati a aut eaque cupiditate, nesciunt sint itaque quae dolores sapiente quaerat! Saepe neque, pariatur placeat accusamus quod quae quibusdam voluptatum magni.
                                    </AccordionItem>
                                </Accordion>
                            </ScrollShadow>
                        </div>
                    </div>
                </div>
            </ScrollShadow>
        </section>
    )
}