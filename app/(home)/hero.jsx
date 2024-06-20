"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
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
  const [heroWidth, setHeroWidth] = useState(0);
  const [heroHeight, setHeroHeight] = useState(0);

  useEffect(() => {
    setHeroWidth(document.getElementById("hero").clientWidth);
    setHeroHeight(document.getElementById("hero").clientHeight);
  }, []);


  return (
    <section id="hero" className="section hero relative text-center">
      <p className={`${_josefinSans} text-2xl md:text-4xl`}>Welcome to</p>
      <p className={`${_stickNoBills} text-7xl md:text-9xl`}>CoreFlex Pilates Studio</p>
      <p className={`${_josefinSans} text-2xl md:text-4xl`}>Your All-in-One Wellness Destination</p>
      <Image 
        src={heroImagePC}
        width={heroWidth}
        height={heroHeight}
        alt=""
        className={clsx("absolute top-0 left-0 -z-20",
          {
            "block": heroHeight < heroWidth,
            "hidden": heroHeight >= heroWidth,
          }          
        )}
      />
      <Image 
        src={heroImageMobile}
        width={heroWidth}
        height={heroHeight}
        alt=""
        className={clsx("absolute top-0 left-0 -z-20",
          {
            "block": heroHeight > heroWidth,
            "hidden": heroHeight <= heroWidth,
          }          
        )}
      />
      <div className={"h-[100vh] w-[100vw] bg-black opacity-80 -z-10 absolute top-0 left-0"}/>
    </section>
  )
}