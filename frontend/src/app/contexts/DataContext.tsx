import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Article, Event, Category, fetchArticles, fetchEvents, fetchCategories } from "../services/api";

interface DataContextType {
    articles: Article[];
    events: Event[];
    categories: Category[];
    loading: boolean;
    error: string | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
    const [articles, setArticles] = useState<Article[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);
                const [articlesData, eventsData, categoriesData] = await Promise.all([
                    fetchArticles(),
                    fetchEvents(),
                    fetchCategories(),
                ]);
                setArticles(articlesData as any);
                setEvents(eventsData as any);
                setCategories(categoriesData as any);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch data:", err);
                setError("Impossible de charger les données depuis le serveur.");
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    return (
        <DataContext.Provider value={{ articles, events, categories, loading, error }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
}
