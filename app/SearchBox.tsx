"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function SearchBox() {
	const [input, setInput] = useState("");
	const router = useRouter();

	const handleSearch = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!input) return;
		router.push(`/search?term=${encodeURIComponent(input)}`);
	};

	return (
		<form
			onSubmit={handleSearch}
			className="max-w-6xl mx-auto flex items-center gap-3 px-6 pb-4"
		>
			<div className="flex flex-1 items-center gap-2 border-b border-slate-300 dark:border-slate-600 focus-within:border-orange-400 dark:focus-within:border-orange-400 transition-colors duration-200 pb-1">
				<MagnifyingGlassIcon className="h-4 w-4 text-slate-400 flex-shrink-0" />
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Search keywords..."
					className="flex-1 bg-transparent text-sm outline-none placeholder-slate-400 dark:placeholder-slate-500 dark:text-slate-100"
				/>
			</div>
			<button
				type="submit"
				disabled={!input}
				className="text-sm font-medium text-orange-400 hover:text-orange-500 disabled:text-slate-300 dark:disabled:text-slate-600 transition-colors duration-200 flex-shrink-0"
			>
				Search →
			</button>
		</form>
	);
}

export default SearchBox;
