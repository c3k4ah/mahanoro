import { MapPin } from "lucide-react";
import { useTranslation } from "../hooks/useTranslation";
import aboutFr from "../../i18n/about-fr.json";
import aboutMg from "../../i18n/about-mg.json";

export function APropos() {
  const { t, language } = useTranslation();
  const aboutContent = language === "fr" ? aboutFr : aboutMg;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="mb-8">{t("about.title")}</h1>

      {/* Introduction */}
      <section className="mb-12">
        <img
          src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="Vue du littoral de Mahanoro, côte est de Madagascar"
          className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
        />
        <p className="text-lg leading-relaxed mb-4">
          {aboutContent.intro.p1}
        </p>
        <p className="text-lg leading-relaxed">
          {aboutContent.intro.p2}
        </p>
      </section>

      {/* History */}
      <section className="mb-12">
        <h2 className="mb-4">{t("about.history")}</h2>
        <p className="leading-relaxed mb-4">
          {aboutContent.history.p1}
        </p>
        <p className="leading-relaxed mb-4">
          {aboutContent.history.p2}
        </p>
      </section>

      {/* Gallery */}
      <section className="mb-12">
        <h2 className="mb-6">{t("about.gallery")}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1687422809617-a7d97879b3b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhbCUyMG1hcmtldCUyMHZlbmRvcnN8ZW58MXx8fHwxNzcxODY1MTUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Marché local"
            className="w-full h-48 object-cover rounded-lg"
          />
          <img
            src="https://images.unsplash.com/photo-1760268081196-759526024e05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJrJTIwcmVjcmVhdGlvbiUyMGNoaWxkcmVufGVufDF8fHx8MTc3MTg2NTE1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Parc municipal"
            className="w-full h-48 object-cover rounded-lg"
          />
          <img
            src="https://images.unsplash.com/photo-1513906029980-32d13afe6d8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBnYXJkZW4lMjBwZW9wbGV8ZW58MXx8fHwxNzcxNzcwODk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Jardin communautaire"
            className="w-full h-48 object-cover rounded-lg"
          />
          <img
            src="https://images.unsplash.com/photo-1514513452089-17f8a9771ee8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWJsaWMlMjBsaWJyYXJ5JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcxODY1MTUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Bibliothèque municipale"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      </section>

      {/* Location */}
      <section className="bg-muted p-6 rounded-lg">
        <h2 className="mb-4">{t("about.location")}</h2>
        <div className="flex items-start gap-3 mb-4">
          <MapPin size={24} className="text-primary flex-shrink-0 mt-1" />
          <div>
            <p className="font-semibold mb-1">{t("about.cityHall")}</p>
            <p className="text-muted-foreground">Mahanoro, District de Mahanoro</p>
            <p className="text-muted-foreground">Région Atsinanana</p>
            <p className="text-muted-foreground">Madagascar</p>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden h-64 w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.675409470929!2d48.805056817459125!3d-19.895923490547602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x21edf8cda40874b5%3A0xc565333e76ca8841!2sMahanoro!5e0!3m2!1sen!2smg!4v1771869614139!5m2!1sen!2smg"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Carte de Mahanoro"
          />
        </div>
      </section>
    </div>
  );
}