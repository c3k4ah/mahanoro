import { useData } from "../contexts/DataContext";

export function useCategories() {
  const { categories } = useData();
  return categories;
}
