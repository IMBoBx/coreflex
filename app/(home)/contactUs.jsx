"use client";

import ContactCard from "../ui/contactCard";

import { useEffect, useRef } from "react";
import { josefinSans, stickNoBills, urbanist, manrope } from "../fonts";


const _josefinSans = josefinSans.className;
const _urbanist = urbanist.className;
const _manrope = manrope.className;

export default function ContactUs() {
    
    useEffect(() => {
        const contactUs = document.getElementById("contactUs");
        const navbar = document.getElementById("navbar");
        // const logo = document.getElementById("logoSVG");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navbar.classList.remove("bg-flame");
                    navbar.classList.add("bg-lavender-bush");
                    // logo.classList.remove("fill-black");
                    // logo.classList.add("fill-flame");
                } else {
                    navbar.classList.remove("bg-lavender-bush");
                    navbar.classList.add("bg-flame");
                    // logo.classList.remove("fill-flame");
                    // logo.classList.add("fill-black");
                }
            })
        }, {threshold: 0.3});

        observer.observe(contactUs);
    })

    const socialLinks = [
        {
            key: 1,
            name: "@coreflexpilatesstudio",
            image: "/instagram.png",
            url: "https://instagram.com/coreflexpilatesstudio/"
        },
        {
            key: 2,
            name: "+91 9911775563",
            image: "/whatsapp.png",
            url: "https://wa.me/+919911775563?text=Hello!"
        },
        {
            key: 3,
            name: "coreflexstudio@gmail.com",
            image: "/email.png",
            url: "mailto:someone@example.com"
        },
        {
            key: 4,
            name: "Visit Us!",
            image: "/location.png",
            url: "https://maps.app.goo.gl/qVQBvag1hnmAoNnf6"
        }
    ]

    return(
        <section id="contactUs" className=" bg-flame text-black">
            <h2 className={_urbanist + " sectionHeader"}>Get in Touch!</h2>
            <div className="cardContainer container mx-auto flex justify-center items-center flex-col md:flex-row flex-wrap p-5 my-6">
                {
                    socialLinks.map((social) => (
                        <ContactCard key={social.key} name={social.name} url={social.url} image={social.image} />
                    ))
                }
            </div>
        </section>
    )
}