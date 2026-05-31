"use client";

import { useState, useRef, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "../constants";

function HamburgerMenu() {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const pathname = usePathname();

	// Close on outside click
	useEffect(() => {
		function onMouseDown(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		}
		document.addEventListener("mousedown", onMouseDown);
		return () => document.removeEventListener("mousedown", onMouseDown);
	}, []);

	// Close on Escape
	useEffect(() => {
		function onKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") setOpen(false);
		}
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, []);

	// Close on route change
	useEffect(() => {
		setOpen(false);
	}, [pathname]);

	const isActive = (cat: string) => pathname?.split("/").pop() === cat;

	return (
		<div ref={ref} className="relative">
			<button
				onClick={() => setOpen((prev) => !prev)}
				aria-label={open ? "Close menu" : "Open category menu"}
				aria-expanded={open}
				aria-haspopup="true"
				className="flex items-center justify-center h-8 w-8 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
			>
				{open ? (
					<XMarkIcon className="h-5 w-5 text-slate-600 dark:text-slate-300" />
				) : (
					<Bars3Icon className="h-5 w-5 text-slate-600 dark:text-slate-400 hover:text-orange-400 transition-colors duration-200" />
				)}
			</button>

			{/* Dropdown panel */}
			<div
				className={`absolute top-full left-0 mt-2 w-52 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden z-50 transition-all duration-200 origin-top-left ${
					open
						? "opacity-100 scale-100 pointer-events-auto"
						: "opacity-0 scale-95 pointer-events-none"
				}`}
				role="menu"
			>
				<p className="px-4 pt-3 pb-1 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
					Categories
				</p>
				{categories.map((cat) => (
					<Link
						key={cat}
						href={`/news/${cat}`}
						role="menuitem"
						className={`flex items-center justify-between px-4 py-2.5 text-sm capitalize transition-colors duration-150 ${
							isActive(cat)
								? "bg-orange-50 dark:bg-orange-900/20 text-orange-500 font-semibold"
								: "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
						}`}
					>
						{cat}
						{isActive(cat) && (
							<span className="h-1.5 w-1.5 rounded-full bg-orange-400 flex-shrink-0" />
						)}
					</Link>
				))}
			</div>
		</div>
	);
}

export default HamburgerMenu;
