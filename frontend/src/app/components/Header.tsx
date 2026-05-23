import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "../hooks/useTranslation";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  const navItems = [
    { name: t("header.home"), path: "/" },
    { name: t("header.news"), path: "/actualites" },
    { name: t("header.events"), path: "/evenements" },
    { name: t("header.about"), path: "/a-propos" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <span className="text-accent-foreground font-bold">M</span>
            </div>
            <span className="font-semibold text-lg">{t("header.cityName")}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 transition-colors ${isActive(item.path)
                      ? "border-b-2 border-accent"
                      : "hover:text-accent"
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-primary-foreground/10">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded transition-colors ${isActive(item.path)
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-primary-foreground/10"
                  }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-3 py-2">
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}