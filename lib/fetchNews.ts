import sortNewsByImage from "./sortNewsByImage";

const fetchNews = async (
  category?: Category | string,
  keywords?: string,
  isDynamic?: boolean,
) => {
  const emptyResponse: NewsResponse = {
    data: [],
    pagination: { count: 0, limit: 0, offset: 0, total: 0 },
  };

  const params = new URLSearchParams({
    access_key: process.env.MEDIASTACK_API_KEY!,
    categories: category || "general",
    countries: "us",
    sort: "published_desc",
    limit: "25",
    offset: "0",
  });

  if (keywords) params.set("keywords", keywords);

  const url = `http://api.mediastack.com/v1/news?${params}`;

  let res: Response;
  try {
    res = await fetch(url, {
      ...(isDynamic ? { cache: "no-store" } : { next: { revalidate: 120 } }),
    });
  } catch (err) {
    console.error("News fetch failed:", err);
    return emptyResponse;
  }

  if (!res.ok) {
    console.error("News API error:", res.status, res.statusText);
    return emptyResponse;
  }

  let newsResponse: NewsResponse;
  try {
    newsResponse = await res.json();
  } catch (err) {
    console.error("News API returned non-JSON response:", err);
    return emptyResponse;
  }

  if (!Array.isArray(newsResponse?.data)) {
    console.error("News API returned unexpected format:", newsResponse);
    return emptyResponse;
  }

  return sortNewsByImage(newsResponse);
};

export default fetchNews;
