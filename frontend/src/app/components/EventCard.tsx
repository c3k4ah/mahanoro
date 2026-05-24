import { Calendar, MapPin, Clock } from "lucide-react";
import { formatDate, formatTime } from "../utils/dates";
import { useTranslation } from "../hooks/useTranslation";

interface EventCardProps {
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
}

export function EventCard({
  title,
  description,
  location,
  startDate,
  endDate,
  imageUrl,
}: EventCardProps) {
  const { language } = useTranslation();

  return (
    <article className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative">
        <img
          src={imageUrl || "/placeholder.png"}
          alt={title}
          className="w-full h-40 object-cover"
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.png"; }}
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 text-primary mb-2">
          <Calendar size={18} />
          <time dateTime={startDate} className="font-semibold">
            {formatDate(startDate, language)}
          </time>
        </div>
        <h3 className="mb-2">{title}</h3>
        <div className="space-y-2 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>
              {formatTime(startDate, language)} - {formatTime(endDate, language)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{location}</span>
          </div>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
      </div>
    </article>
  );
}