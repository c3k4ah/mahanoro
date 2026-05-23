import { useLanguage } from "../contexts/LanguageContext";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Languages size={18} className="text-primary-foreground" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as "fr" | "mg")}
        className="bg-transparent text-primary-foreground border border-primary-foreground/20 rounded px-2 py-1 text-sm cursor-pointer hover:bg-primary-foreground/10 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
      >
        <option value="fr">Français</option>
        <option value="mg">Malagasy</option>
      </select>
    </div>
  );
}
