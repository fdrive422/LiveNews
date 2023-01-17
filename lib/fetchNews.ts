import { gql } from "graphql-request";
import sortNewsByImage from "./sortNewsByImage";

const fetchNews = async (
	category?: Category | string,
	keywords?: string,
	isDynamic?: boolean
) => {
	// GraphQL query
	const query = gql`
		query MyQuery(
			$access_key: String!
			$categories: String!
			$keywords: String
		) {
			myQuery(
				access_key: $access_key
				categories: $categories
				countries: "us"
				sort: "published_desc"
				keywords: $keywords
			) {
				data {
					author
					category
					image
					description
					country
					language
					published_at
					source
					title
					url
				}
				pagination {
					count
					limit
					offset
					total
				}
			}
		}
	`;

	// Fetch function with Next.js 13 caching...
	const res = await fetch(
		"https://capaobonito.stepzen.net/api/wintering-rattlesnake/__graphql",
		{
			method: "POST",
			cache: isDynamic ? "no-cache" : "default",
			next: isDynamic ? { revalidate: 0 } : { revalidate: 120 },
			headers: {
				"Content-Type": "application/json",
				Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
			},
			body: JSON.stringify({
				query,
				variables: {
					access_key: process.env.MEDIASTACK_API_KEY,
					categories: category,
					keywords: keywords,
				},
			}),
		});
	console.log(
		'LOADING NEW DATA FROM API for category >>>',
		category,
		keywords
	);

	const newsResponse = await res.json();

	// Sort function by images vs no images
	const data = sortNewsByImage(newsResponse.data.myQuery);

	// return res
	return data || 'fetch error';
};

export default fetchNews;

// Example Import
// stepzen import curl "http://api.mediastack.com/v1/news?access_key=***&countries=us%2Cgb&limit=100&offset=0&sort=published_desc"