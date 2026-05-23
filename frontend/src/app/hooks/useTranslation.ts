import { useLanguage } from "../contexts/LanguageContext";
import frTranslations from "../../i18n/fr.json";
import mgTranslations from "../../i18n/mg.json";

type TranslationKey = string;

export function useTranslation() {
  const { language } = useLanguage();

  const translations = language === "fr" ? frTranslations : mgTranslations;

  const t = (key: TranslationKey): string => {
    const keys = key.split(".");
    let value: any = translations;

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return { t, language };
}
