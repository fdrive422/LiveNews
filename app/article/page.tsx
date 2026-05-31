"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import LiveTimestamp from "../LiveTimestamp";

function ArticleContent() {
	const data = useSearchParams();
	const article: Article = {
		author: data.get("author"),
		category: data.get("category")!,
		country: data.get("country")!,
		description: data.get("description")!,
		image: data.get("image"),
		language: data.get("language")!,
		published_at: data.get("published_at")!,
		source: data.get("source")!,
		title: data.get("title")!,
		url: data.get("url")!,
	};

	return (
		<article>
			<section className="flex flex-col lg:flex-row pb-24 px-0 lg:px-10">
				{article.image && (
					<img
						className="h-50 max-w-md mx-auto md:max-w-lg lg:max-w-xl object-cover rounded-lg shadow-md"
						src={article.image}
						alt={article.title}
					/>
				)}

				<div className="px-10">
					<h1 className="headerTitle px-0 no-underline pb-2">
						{article.title}
					</h1>

					<div className="flex divide-x-2 space-x-4">
						<h2 className="font-bold">By: {article.author}</h2>
						<h2 className="font-bold pl-4">
							Source: {article.source}
						</h2>
						<p className="pl-4">
							<LiveTimestamp time={article.published_at} />
						</p>
					</div>

					<p className="pt-4">{article.description}</p>
				</div>
			</section>
		</article>
	);
}

function ArticlePage() {
	return (
		<Suspense fallback={<div className="animate-pulse font-serif text-lg text-gray-400 text-center p-10">Loading article...</div>}>
			<ArticleContent />
		</Suspense>
	);
}

export default ArticlePage;
