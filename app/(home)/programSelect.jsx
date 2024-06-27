"use client";

import Link from "next/link";
import Image from "next/image";

import { useState, useEffect, useMemo } from "react";

import { josefinSans, stickNoBills, urbanist } from "../fonts";

import './home.css';

const _josefinSans = josefinSans.className;
const _urbanist = urbanist.className;
const _stickNoBills = stickNoBills.className;


export default function ProgramSelect() {

    // Pilates

    const pilatesPrograms = useMemo(() => ["Reformer", "Mat", "Barre"], []);

    const [i, setI] = useState(0);
    const [currentPilates, setPilates] = useState(pilatesPrograms[i]);
    
    useEffect(() => {
        const pilatesElement = document.getElementById("pilatesProgram");
        const interval = setInterval(() => {
            setI(prevI => {
                const nextI = prevI === pilatesPrograms.length - 1 ? 0 : prevI + 1;

                pilatesElement.style = `
                    transform: translateX(50%);
                    opacity: 0;
                `;
                setTimeout(() => {
                    setPilates(pilatesPrograms[nextI]);
                    pilatesElement.style = `
                    transform: translateX(-50%);
                    opacity: 0; 
                    `;
                    setTimeout(() => {
                        pilatesElement.style = `
                        transform: translateX(0);
                        opacity: 1;
                        `;
                    }, 150);
                }, 150);
                return nextI;
            });
            
        }, 1200);

        // Clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, [pilatesPrograms]);
    


    const yogaPrograms = ["Yoga", "Aerial Yoga", "Tabata", "Strength Training"];
    
    return (
        <section id="programSelectPC" className="flex gap-0 justify-center h-screen overflow-hidden relative"> 
            <div className="program pilates">
                <div className={_urbanist}>
                    <p id="pilatesProgram" className="transition-all swoosh">{currentPilates}</p>
                </div>
                <span className={_urbanist}>Pilates</span>
            </div>

            <div className="program yoga">
                {/* <span className="rounded-lg whitespace-nowrap text-ellipsis overflow-scroll">Strength Training</span> */}
            </div>
        </section>
    );
}