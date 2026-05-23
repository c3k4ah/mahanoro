import { Link } from "react-router";
import { useTranslation } from "../hooks/useTranslation";

export function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 text-center">
      <h1 className="text-6xl md:text-8xl mb-4">404</h1>
      <h2 className="mb-4">{t("notFound.title")}</h2>
      <p className="text-lg text-muted-foreground mb-8">
        {t("notFound.message")}
      </p>
      <Link
        to="/"
        className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
      >
        {t("common.backToHome")}
      </Link>
    </div>
  );
}