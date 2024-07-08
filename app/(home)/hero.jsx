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
      <h4 className={`${_urbanist}`}>Welcome to</h4>
      <h1 className={`${_stickNoBills}`}>CoreFlex Pilates Studio</h1>
      <h4 className={`${_urbanist}`}>Your All-in-One Wellness Destination</h4>
      <Image
        src={heroImagePC}
        width={10000}
        height={10000}
        alt=""
        className={"heroImage hidden md:block blur-sm"}
      />
      <Image 
        src={heroImageMobile}
        width={10000}
        height={10000}
        alt=""
        className={"heroImage block md:hidden blur-sm"}
      />
      <div className={"h-[100vh] w-[100vw] bg-black opacity-50 -z-10 absolute top-0 left-0"}/>
    </section>
  )
}