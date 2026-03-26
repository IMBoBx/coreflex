import Navbar from "./components/Navbar";

export default function HomeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 scroll-smooth">
			<Navbar />
			{children}
		</div>
	);
}
