"use client";

import { useRouter } from "next/navigation";

type Props = {
	article: Article;
};

function ReadMoreButton({ article }: Props) {
	const router = useRouter();

	const handleClick = () => {
		const params = new URLSearchParams(
			Object.entries(article).reduce<Record<string, string>>(
				(acc, [key, value]) => {
					if (value != null) acc[key] = String(value);
					return acc;
				},
				{}
			)
		);
		router.push(`/article?${params.toString()}`);
	};

	return (
		<button
			onClick={handleClick}
			className="bg-orange-400 hover:bg-orange-500 dark:text-zinc-900 text-white text-sm font-medium tracking-wide py-2.5 transition-colors duration-200"
		>
			Read More →
		</button>
	);
}

export default ReadMoreButton;
