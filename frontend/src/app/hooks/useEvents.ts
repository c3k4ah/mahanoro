import { useData } from "../contexts/DataContext";

export function useEvents() {
  const { events } = useData();
  return events;
}
