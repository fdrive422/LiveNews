import Link from "next/link";

type Props = {
	category: string;
	isActive: boolean;
};

function NavLink({ category, isActive }: Props) {
	return (
		<Link
			href={`/news/${category}`}
			className={`text-sm capitalize px-4 py-1.5 rounded-full transition-all duration-200 ${
				isActive
					? "bg-orange-400 text-white dark:text-zinc-900 font-semibold shadow-sm"
					: "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
			}`}
		>
			{category}
		</Link>
	);
}

export default NavLink;
