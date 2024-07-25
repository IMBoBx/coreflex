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
        base: "py-0 w-full m-0",
        title: _manrope + " text-lavender-bush h5 m-0 py-0",
        indicator: "md:scale-[.3] scale-[.4]",
        content:  _manrope + " text-lavender-bush text-left text-lg md:text-xl",
    };

    return (
        <section id="explore" className=" bg-black text-lavender-bush ">
            <h2 className={_urbanist + " sectionHeader h-[10vh] md:h-[20vh]  border-blue-300"}>What We Offer</h2>
            <ScrollShadow className="weOfferContainer" hideScrollBar isEnabled={false}>
                <div className="weOfferSection">
                    <h3 className={_josefinSans + " mb-5 md:my-auto"}>Pilates — Our Signature Class</h3>
                    <div className="programContainer">
                        <div className="programImagesContainer">
                                <Image 
                                    src="/choosePilatesMobile.jpg"
                                    alt=""
                                    className="programImagesContainer>img"    
                                />
                        </div>
                        <div className="programAccordionContainer" >
                            <ScrollShadow hideScrollBar>
                                <Accordion itemClasses={accordionClasses}>
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
                        <div className="programImagesContainer ">
                                <Image 
                                    src="/chooseYogaMobile.jpg"
                                    alt=""
                                    className="programImagesContainer>img"    
                                />
                        </div>
                        <div className="programAccordionContainer" >
                            <ScrollShadow size={40}>
                                <Accordion itemClasses={accordionClasses}>
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