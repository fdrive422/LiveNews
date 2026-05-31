"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

function DarkModeButton() {
	const [mounted, setMounted] = useState(false);
	const { systemTheme, theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return <div className="h-6 w-6" />;
	}

	const currentTheme = theme === "system" ? systemTheme : theme;

	return currentTheme === "dark" ? (
		<SunIcon
			className="h-6 w-6 cursor-pointer text-amber-400 hover:text-amber-300 transition-colors duration-200"
			onClick={() => setTheme("light")}
		/>
	) : (
		<MoonIcon
			className="h-6 w-6 cursor-pointer text-slate-600 hover:text-slate-900 transition-colors duration-200"
			onClick={() => setTheme("dark")}
		/>
	);
}

export default DarkModeButton;
