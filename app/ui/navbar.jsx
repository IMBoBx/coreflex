import Image from "next/image";

export default function Navbar() {
    return(
        <nav className="md:h-[10vh] h-[10vh] sticky top-0 bg-flame w-screen z-20">
            <Image 
                alt=""
                width={1000}
                height={1000}
                className="h-full w-auto"
                src={"/logo.svg"}
            />
        </nav>
    )
}