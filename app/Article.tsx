import LiveTimestamp from "./LiveTimestamp";
import ReadMoreButton from "./ReadMoreButton";
import ArticleImage from "./ArticleImage";

type Props = {
  article: Article;
};

function Article({ article }: Props) {
  return (
    <article className="bg-white dark:bg-slate-800 flex flex-col rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ease-out overflow-hidden">
      {article.image && (
        <ArticleImage src={article.image} alt={article.title} />
      )}

      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col p-5">
          <h2 className="font-bold font-serif text-base leading-snug line-clamp-2 text-slate-900 dark:text-slate-100">
            {article.title}
          </h2>

          <p className="mt-2 flex-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
            {article.description}
          </p>

          <footer className="mt-4 flex items-center justify-end gap-1 text-xs text-slate-400 dark:text-slate-500">
            <span>{article.source}</span>
            <span>·</span>
            <LiveTimestamp time={article.published_at} />
          </footer>
        </div>

        <ReadMoreButton article={article} />
      </div>
    </article>
  );
}

export default Article;
