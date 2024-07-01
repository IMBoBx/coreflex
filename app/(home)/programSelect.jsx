"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";

import { josefinSans, stickNoBills, urbanist } from "../fonts";

import './home.css';

const _urbanist = urbanist.className;

const pilatesPrograms = ["Reformer", "Mat", "Barre"];
const yogaPrograms = ["Yoga", "Aerial Yoga", "Tabata", "Strength Training"];



export default function ProgramSelect() {

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
    }, []);


    const [j, setJ] = useState(0);
    const [currentYoga, setYoga] = useState(yogaPrograms[j]);
    
    useEffect(() => {
        const yogaElement = document.getElementById("yogaProgram");
        const interval = setInterval(() => {
            setJ(prevJ => {
                const nextJ = prevJ === yogaPrograms.length - 1 ? 0 : prevJ + 1;

                yogaElement.style = `
                    transform: translateY(25%);
                    opacity: 0;
                `;
                setTimeout(() => {
                    setYoga(yogaPrograms[nextJ]);
                    yogaElement.style = `
                    transform: translateY(-35%);
                    opacity: 0; 
                    `;
                    setTimeout(() => {
                        yogaElement.style = `
                        transform: translateY(0);
                        opacity: 1;
                        `;
                    }, 150);
                }, 150);
                return nextJ;
            });
            
        }, 1200);

        // Clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="programSelectPC" className={"flex md:gap-0 md:flex-row flex-col justify-center h-screen " + _urbanist}> 
            <div className="program pilates h-48">
                <Link className="flex flex-col" href={"#"}>
                    <div>
                        <p id="pilatesProgram" className="transition-all md:h-12 grid place-items-center">{currentPilates}</p>
                    </div>
                    <span className="mainProgramText md:h-36 grid place-items-center">Pilates</span>
                </Link>
            </div>

            <div className="program yoga">
                <Link className="grid place-items-center rounded-lg mainProgramText" href={"#"}>
                   <p id="yogaProgram" className="transition-all h-24 md:h-48 grid place-items-center">{currentYoga}</p>
                </Link>
            </div>
        </section>
    );
}