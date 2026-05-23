import { useData } from "../contexts/DataContext";

export function useArticles() {
  const { articles } = useData();
  return articles;
}
