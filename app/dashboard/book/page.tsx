"use client";
import { useEffect, useState } from "react";
import { IProgram } from "@/models/Program";
import { FetchApi } from "@/lib/fetchApi";
import SlotsCardContainer from "./components/SlotCardsContainer";
import DateScroller from "./components/DateScroller";
import ProtectedRoute from "@/components/ProtectedRoute";

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
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState("");
    const [userId, setUserId] = useState("")
    const [programs, setPrograms] = useState<IProgram[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        setToken(localStorage.getItem("token") ?? "");
        setUserId(localStorage.getItem("userId") ?? "");
    }, []);
    
    useEffect(() => {
        setLoading(false)
        const fetchPrograms = async () => {
            const res = await FetchApi.get("/program", {
                headers: { Authorization: `Bearer ${token}` },
            });
            res && setPrograms(res.data);
        };
        !loading && fetchPrograms();
    }, [token]);

    return (
        loading ? "Loading..." : <ProtectedRoute allowedRoles={["admin", "client"]}>
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
                                    userId={userId}
                                    token={token}
                                />
                            </div>
                        );
                    })}
            </div>
        </ProtectedRoute>
    );
}
