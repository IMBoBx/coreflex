import { josefinSans, manrope, stickNoBills, urbanist } from "@/app/fonts";

const _josefinSans = josefinSans.className;
const _urbanist = urbanist.className;
const _stickNoBills = stickNoBills.className;
const _manrope = manrope.className;

export default function TestimonialCard({name, description}) {
    return (
        <div className="testimonial border-gray_ border-2 rounded-md h-[25vh] max-w-[40%] min-w-[20rem] bg-lavender-bush text-black text-left p-5 my-6">
            <h4 className={_josefinSans }>{name}</h4>
            <div className={"max-h-px w-full border-flame border"} />
            <p className={_manrope + " overflow-y-auto max-h-[calc(100%-1.5rem)]"}>{description}</p> 
        </div>
    )
}