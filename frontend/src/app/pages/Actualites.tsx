import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { ArticleCard } from "../components/ArticleCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useArticles } from "../hooks/useArticles";
import { useCategories } from "../hooks/useCategories";
import { useData } from "../contexts/DataContext";
import { useTranslation } from "../hooks/useTranslation";

export function Actualites() {
  const articlesData = useArticles();
  const categoriesData = useCategories();
  const { loading } = useData();
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  const filteredArticles = useMemo(() => {
    return articlesData.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || article.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, articlesData]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const paginatedArticles = filteredArticles.slice(
    startIndex,
    startIndex + articlesPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="mb-8">{t("news.title")}</h1>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={20}
          />
          <input
            type="search"
            placeholder={t("common.search")}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setSelectedCategory("all");
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full transition-colors ${selectedCategory === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
          >
            {t("common.allNews")}
          </button>
          {categoriesData.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.name);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full transition-colors ${selectedCategory === category.name
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-muted-foreground mb-6">
        {filteredArticles.length}{" "}
        {filteredArticles.length === 1 ? t("common.result") : t("common.results")}
      </p>

      {/* Articles Grid */}
      {paginatedArticles.length > 0 ? (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedArticles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t("common.previous")}
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg transition-colors ${currentPage === page
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t("common.next")}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            {t("common.noResults")}
          </p>
        </div>
      )}
    </div>
  );
}