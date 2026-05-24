import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Calendar } from "lucide-react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useArticles } from "../hooks/useArticles";
import { useData } from "../contexts/DataContext";
import { useTranslation } from "../hooks/useTranslation";
import { formatDate } from "../utils/dates";

export function ActualiteDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const articlesData = useArticles();
  const { loading } = useData();
  const { t, language } = useTranslation();

  if (loading) {
    return <LoadingSpinner />;
  }

  const article = articlesData.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="mb-4">{t("news.notFound")}</h1>
          <button
            onClick={() => navigate("/actualites")}
            className="text-primary hover:underline"
          >
            {t("common.backToNews")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back button */}
      <button
        onClick={() => navigate("/actualites")}
        className="flex items-center gap-2 text-primary hover:underline mb-6"
      >
        <ArrowLeft size={20} />
        {t("common.backToNews")}
      </button>

      {/* Category */}
      <div className="mb-4">
        <span className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm">
          {article.category}
        </span>
      </div>

      {/* Title */}
      <h1 className="mb-4">{article.title}</h1>

      {/* Date */}
      <div className="flex items-center gap-2 text-muted-foreground mb-6">
        <Calendar size={18} />
        <time dateTime={article.publishedAt}>
          {formatDate(article.publishedAt, language)}
        </time>
      </div>

      {/* Image */}
      <img
        src={article.imageUrl || "/placeholder.png"}
        alt={article.title}
        className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
        onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.png"; }}
      />

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        {article.content.split("\n\n").map((paragraph, index) => (
          <p key={index} className="mb-4 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Back button bottom */}
      <div className="mt-12 pt-8 border-t border-border">
        <button
          onClick={() => navigate("/actualites")}
          className="flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft size={20} />
          {t("common.backToNews")}
        </button>
      </div>
    </article>
  );
}