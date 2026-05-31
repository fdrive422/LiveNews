import "../styles/globals.css";
import Header from "./Header";
import Providers from "./Providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Live News",
	description: "Latest news from around the world",
	icons: { icon: "/favicon.ico" },
	viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="bg-gray-100 dark:bg-zinc-900 transition-all duration-700">
				<Providers>
					<Header />
					<div className="max-w-6xl mx-auto">{children}</div>
				</Providers>
			</body>
		</html>
	);
}
