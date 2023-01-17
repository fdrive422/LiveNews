export default function sortNewsByImage(news: NewsResponse) {
	// const newsWithImage = news.data.filter((item) => item.image !== null);
	// const newsWithoutImage = news.data.filter((item) => item.image === null);

	const newsWithImage = news.data.filter((item) => item.image);
	const newsWithoutImage = news.data.filter((item) => !item.image);

	const sortedNewsResponse = {
		pagination: news.pagination,
		data: [...newsWithImage, ...newsWithoutImage],
	};

	return sortedNewsResponse;
}