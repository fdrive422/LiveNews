"use client";

// import { notFound } from "next/navigation";
import { useSearchParams } from "next/navigation";
import LiveTimestamp from "../LiveTimestamp";

// type Props = {
// 	searchParams?: Article;
// };

// function ArticlePage({ searchParams }: Props) {
// 	if (
// 		(searchParams && Object.entries(searchParams).length === 0) ||
// 		!searchParams
// 	) {
// 		return notFound();
// 	}

// 	const article: Article = searchParams;

function ArticlePage() {
	//? This approach works, but is not preferred.
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
						<h2 className="fond-bold pl-4">
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

export default ArticlePage;
