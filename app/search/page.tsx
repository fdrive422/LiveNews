import fetchNews from "../../lib/fetchNews";
import NewsList from "../NewsList";

type Props = {
	searchParams?: { term: string };
};

async function SearchPage({ searchParams }: Props) {
	const news: NewsResponse = await fetchNews(
		"general",
		searchParams?.term,
		true
	);

	if (!news.data.length) {
		return (
			<h1 className="text-4xl font-serif capitalize px-10 pt-5">
				No news found.
			</h1>
		);
	}
	return (
		<div>
			<h1 className="headerTitle">
				Search Results for: {searchParams?.term}
			</h1>
			<NewsList news={news} />
		</div>
	);
}

export default SearchPage;
