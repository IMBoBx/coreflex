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
      <div className="z-10">
        <h4 className={`${_urbanist}`}>Welcome to</h4>
        <h1 className={`${_stickNoBills}`}>CoreFlex Pilates Studio</h1>
        <h4 className={`${_urbanist}`}>Your All-in-One Wellness Destination</h4>
      </div>
      <div className={"h-full w-full bg-black opacity-[.50] absolute top-0 left-0"}/>
    </section>
  )
}