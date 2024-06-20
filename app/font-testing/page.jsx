import { josefinSans, stickNoBills, urbanist } from "../fonts";

const str = "CoreFlex Pilates Studio";

export default function Page() {
    return <div className={"m-10 text-6xl"}>
        <p className={josefinSans.className}>{str}</p>
        <br />
        <p className={urbanist.className}>{str}</p>
        <br />
        <p className={stickNoBills.className}>{str}</p>
    </div>
}