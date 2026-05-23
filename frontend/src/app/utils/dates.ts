export function formatDate(dateString: string, language: "fr" | "mg" = "fr"): string {
  const date = new Date(dateString);
  const locale = language === "fr" ? "fr-FR" : "mg-MG";
  
  try {
    return date.toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    // Fallback to French if Malagasy locale not available
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
}

export function formatTime(dateString: string, language: "fr" | "mg" = "fr"): string {
  const date = new Date(dateString);
  const locale = language === "fr" ? "fr-FR" : "mg-MG";
  
  try {
    return date.toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    // Fallback to French if Malagasy locale not available
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
}

export function isUpcoming(dateString: string): boolean {
  const date = new Date(dateString);
  const now = new Date();
  return date > now;
}