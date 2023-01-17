import Article from "./Article";

type Props = {
	news: NewsResponse;
};

function NewsList({ news }: Props) {
	return news ? (
		<main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-10 gap-10">
			{news.data.map(
				(article) =>
					article.image && (
						<Article key={article.title} article={article} />
					)
			)}
		</main>
	) : (
		<h1 className="p-10 font-serif">No result found.</h1>
	);
}

export default NewsList;
