import { ArticleCard } from "../components/ArticleCard";
import { EventCard } from "../components/EventCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useArticles } from "../hooks/useArticles";
import { useEvents } from "../hooks/useEvents";
import { useData } from "../contexts/DataContext";
import { useTranslation } from "../hooks/useTranslation";
import { isUpcoming } from "../utils/dates";

export function Home() {
  const articlesData = useArticles();
  const eventsData = useEvents();
  const { loading } = useData();
  const { t } = useTranslation();

  if (loading) {
    return <LoadingSpinner />;
  }

  const featuredArticle = articlesData.find((article) => article.isFeatured);
  const recentArticles = articlesData
    .filter((article) => !article.isFeatured)
    .slice(0, 4);

  const upcomingEvents = eventsData
    .filter((event) => !event.isArchived && isUpcoming(event.startDate))
    .slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl mb-4">
            {t("home.hero.title")}
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl">
            {t("home.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Featured & Recent Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h2 className="mb-8">{t("home.latestNews")}</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredArticle && (
            <ArticleCard
              key={featuredArticle.id}
              {...featuredArticle}
              featured
            />
          )}
          {recentArticles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>

        <div className="text-center">
          <a
            href="/actualites"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            {t("home.viewAllNews")}
          </a>
        </div>
      </section>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="bg-muted py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8">{t("home.upcomingEvents")}</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>

            <div className="text-center mt-8">
              <a
                href="/evenements"
                className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                {t("home.viewAllEvents")}
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}