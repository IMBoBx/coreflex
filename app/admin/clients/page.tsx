import { Metadata } from "next";
import ClientCardContainer from "./components/ClientCardContainer";

export const metadata: Metadata = {
    title: "Client Management | Coreflex",
    description:
        "Manage and view all clients in the Coreflex Pilates Studio system.",
    openGraph: {
        title: "Client Management | Coreflex",
        description:
            "Manage and view all clients in the Coreflex Pilates Studio system.",
        type: "website",
    },
};

export default function Page() {
    return <ClientCardContainer />;
}
