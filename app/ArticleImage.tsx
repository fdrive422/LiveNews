"use client";

import { useState } from "react";

type Props = {
	src: string;
	alt: string;
};

function ArticleImage({ src, alt }: Props) {
	const [loaded, setLoaded] = useState(false);

	return (
		<div className="relative h-48 w-full overflow-hidden bg-slate-200 dark:bg-slate-700 flex-shrink-0">
			<img
				src={src}
				alt={alt}
				loading="lazy"
				onLoad={() => setLoaded(true)}
				className={`h-48 w-full object-cover transition-all duration-500 ease-out ${
					loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
				}`}
			/>
		</div>
	);
}

export default ArticleImage;
