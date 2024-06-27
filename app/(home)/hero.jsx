import Image from "next/image";

import { josefinSans, stickNoBills, urbanist } from "../fonts";

import "./home.css";

const heroImagePC = "/heroImagePC2.jpg";
const heroImageMobile = "/heroImageMobile.jpg";

// fonts
const _josefinSans = josefinSans.className;
const _urbanist = urbanist.className;
const _stickNoBills = stickNoBills.className;


export default function Hero() {
  return (
    <section id="hero" className="section hero relative text-center">
      <p className={`${_urbanist} text-2xl md:text-4xl`}>Welcome to</p>
      <p className={`${_stickNoBills} text-7xl md:text-9xl`}>CoreFlex Pilates Studio</p>
      <p className={`${_urbanist} text-2xl md:text-4xl`}>Your All-in-One Wellness Destination</p>
      <Image
        src={heroImagePC}
        width={10000}
        height={10000}
        alt=""
        className={"heroImage hidden md:block"}
      />
      <Image 
        src={heroImageMobile}
        width={10000}
        height={10000}
        alt=""
        className={"heroImage block md:hidden"}
      />
      <div className={"h-[100vh] w-[100vw] bg-black opacity-80 -z-10 absolute top-0 left-0"}/>
    </section>
  )
}