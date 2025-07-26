import { Metadata } from "next";
import ClientCardContainer from "./components/ClientCardContainer";

export const metadata: Metadata = {
    title: "Client Management | CoreFlex Admin",
    description: "Manage and view all clients in the CoreFlex system",
};

export default function Page() {
    return <ClientCardContainer />;
}
