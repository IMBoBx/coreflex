import Hero from "./hero";
import ProgramSelect from "./programSelect";
import Testimonials from "./testimonials";
import ExplorePrograms from "./explorePrograms";
import ContactUs from "./contactUs";

export default function Page() {
    return(
        <>
            <Hero />
            <ProgramSelect />
            <ExplorePrograms />
            <ContactUs />
            <Testimonials />
        </>
    )
}