"use client";

import { categories } from "../constants";
import { usePathname } from "next/navigation";
import NavLink from "./NavLink";

function NavLinks() {
	const pathname = usePathname();
	const isActive = (path: string) => pathname?.split("/").pop() === path;

	return (
		<nav className="flex flex-wrap justify-center gap-2 px-6 pb-4 max-w-6xl mx-auto">
			{categories.map((category) => (
				<NavLink
					key={category}
					category={category}
					isActive={isActive(category)}
				/>
			))}
		</nav>
	);
}

export default NavLinks;
