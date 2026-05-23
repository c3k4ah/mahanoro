import { Link } from "react-router";
import { Calendar } from "lucide-react";
import { formatDate } from "../utils/dates";
import { useTranslation } from "../hooks/useTranslation";

interface ArticleCardProps {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  imageUrl: string;
  publishedAt: string;
  featured?: boolean;
}

export function ArticleCard({
  title,
  slug,
  category,
  excerpt,
  imageUrl,
  publishedAt,
  featured = false,
}: ArticleCardProps) {
  const { t, language } = useTranslation();

  return (
    <article
      className={`bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      <Link to={`/actualites/${slug}`}>
        <div className="relative">
          <img
            src={imageUrl}
            alt={title}
            className={`w-full object-cover ${
              featured ? "h-64 md:h-96" : "h-48"
            }`}
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
              {category}
            </span>
          </div>
        </div>
        <div className="p-4 md:p-6">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
            <Calendar size={16} />
            <time dateTime={publishedAt}>{formatDate(publishedAt, language)}</time>
          </div>
          <h3 className={featured ? "text-xl md:text-2xl mb-3" : "mb-2"}>
            {title}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-3">{excerpt}</p>
          <span className="text-primary hover:underline inline-flex items-center gap-1">
            {t("common.readMore")} →
          </span>
        </div>
      </Link>
    </article>
  );
}