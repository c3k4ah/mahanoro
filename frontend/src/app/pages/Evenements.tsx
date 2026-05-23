import { EventCard } from "../components/EventCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useEvents } from "../hooks/useEvents";
import { useData } from "../contexts/DataContext";
import { useTranslation } from "../hooks/useTranslation";
import { isUpcoming } from "../utils/dates";

export function Evenements() {
  const eventsData = useEvents();
  const { loading } = useData();
  const { t } = useTranslation();

  if (loading) {
    return <LoadingSpinner />;
  }

  const upcomingEvents = eventsData
    .filter((event) => !event.isArchived && isUpcoming(event.startDate))
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

  const archivedEvents = eventsData
    .filter((event) => event.isArchived || !isUpcoming(event.startDate))
    .sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="mb-8">{t("events.title")}</h1>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-primary">{t("events.upcoming")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </section>
      )}

      {/* Archived Events */}
      {archivedEvents.length > 0 && (
        <section>
          <h2 className="mb-6 text-muted-foreground">{t("events.past")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-75">
            {archivedEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </section>
      )}

      {upcomingEvents.length === 0 && archivedEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            {t("common.noEvents")}
          </p>
        </div>
      )}
    </div>
  );
}