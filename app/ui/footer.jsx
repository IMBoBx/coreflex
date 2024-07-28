import { Image } from "@nextui-org/image";
import Link from "next/link";

import { josefinSans, stickNoBills, urbanist, manrope } from "../fonts";
import "../(home)/home.css";

const _manrope = manrope.className;


export default function Footer() {
    return(
        <footer className={_manrope +  "footer bg-flame text-black  snap-end py-10"}>
            <div className="container mx-auto flex flex-col md:flex-row justify-between px-10">
                <Link href={""} className="footerLogo self-start">
                        <Image 
                            src="/logo.svg"
                            alt=""
                            className="h-[10vh]"
                        />
                </Link>
                <div className="footerAddress">
                    <Link href={"https://maps.app.goo.gl/qVQBvag1hnmAoNnf6"} target="blank">
                        <p className="font-bold border-b-2 border-black w-fit">Visit Us</p>
                    </Link>
                        <p>D-22A, Basement</p>
                        <p>Block D, Rajouri Garden</p>
                        <p>New Delhi - 110027</p>
                        <p>Delhi, India</p>
                </div>
                <div className="footerContact">
                    <p className="font-bold border-b-2 border-black w-fit">Contact</p>
                    <Link href={"tel:+919911775563"} target="blank"><p>Mobile: +91 9911775563</p></Link>
                    <Link href={"mailto:someone@example.com"} target="blank"><p>Email: coreflexstudio@gmail.com</p></Link>
                    <Link href={"https://wa.me/+919911775563?text=Hello!"} target="blank"><p>Whatsapp: +91 9911775563</p></Link>
                </div>
                <div>
                    <p className="font-bold border-b-2 border-black w-fit">Social</p>
                    <Link href={"https://instagram.com/coreflexpilatesstudio/"} target="blank">
                        <p>Instagram</p>
                    </Link>
                    <Link href={"https://www.facebook.com/Coreflex-Pilates-Studio-102126455861802/"} target="blank">
                        <p>Facecbook</p>
                    </Link>
                </div>
            </div>
        </footer>
    )
}