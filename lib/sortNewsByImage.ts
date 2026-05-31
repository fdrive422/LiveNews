export default function sortNewsByImage(news: NewsResponse) {
	const seen = new Set<string>();
	const unique = news.data.filter((item) => {
		if (seen.has(item.url)) return false;
		seen.add(item.url);
		return true;
	});

	const newsWithImage = unique.filter((item) => item.image);
	const newsWithoutImage = unique.filter((item) => !item.image);

	return {
		pagination: news.pagination,
		data: [...newsWithImage, ...newsWithoutImage],
	};
}