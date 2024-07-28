import Image from "next/image";

export default function Navbar() {
    return(
        <nav id="navbar" className="h-[10.1vh] sticky md:top-0 bg-flame w-screen z-20 transition-all duration-400">
            <Image 
                alt=""
                width={1000}
                height={1000}
                id="logoSVG"
                className="h-full w-auto"
                src={"/logo.svg"}
            />
        </nav>
    )
}