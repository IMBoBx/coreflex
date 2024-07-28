import { Image } from "@nextui-org/image"
import Link from "next/link";

import { josefinSans, stickNoBills, urbanist, manrope } from "../fonts";

const _manrope = manrope.className;

export default function ContactCard({image, name, url}) {
    return (
        <Link href={url} target="blank" className="mx-auto md:w-[40%] w-full md:my-10 my-4">
            <button className="contactCard mx-auto md:h-[20vh] h-fit w-full bg-black text-lavender-bush border border-gray_ flex justify-between items-center md:p-12 py-5 px-4 rounded-full">
                <Image
                    alt=""
                    src={image}
                    className="md:w-24 w-16 h-auto"
                />
                <p className={_manrope + " flex-grow text-center" }>
                    {name}
                </p>
            </button>
        </Link> 
    )
}