"use client";
import { useEffect, useState } from "react";
import { IProgram } from "@/models/Program";
import { FetchApi } from "@/lib/fetchApi";
import SlotsCardContainer from "./components/SlotCardsContainer";
import DateScroller from "./components/DateScroller";

const dummyUserId = "686ed7361441e138d380e537";

const getDateArray = (days: number) => {
    const arr = [];
    const today = new Date();
    for (let i = 0; i < days; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        arr.push(d);
    }
    return arr;
};

export default function Page() {
    const [programs, setPrograms] = useState<IProgram[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const dateArray = getDateArray(30);

    useEffect(() => {
        const fetchPrograms = async () => {
            const res = await FetchApi.get("/program");
            res && setPrograms(res.data);
        };
        fetchPrograms();
    }, []);

    return (
        <div className="max-w-sm md:max-w-4xl mx-auto p-2">
            {/* Date selector */}
            <DateScroller
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                days={30}
            />
            {programs.length > 0 &&
                programs.map((program) => {
                    return (
                        <div key={program._id + ""}>
                            <div className="flex justify-center mb-4">
                                <div className="font-semibold text-xl md:text-2xl">
                                    {program.name}
                                </div>
                            </div>

                            <SlotsCardContainer
                                programId={program._id + ""}
                                name={program.name}
                                description={program.description ?? ""}
                                date={selectedDate}
                                userId={dummyUserId}
                            />
                        </div>
                    );
                })}
        </div>
    );
}
