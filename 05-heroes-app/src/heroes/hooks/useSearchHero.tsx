import { useQuery } from "@tanstack/react-query";
import { searchHeroesAction } from "../actions/search-heroes.action";

interface Props {
  name?: string;
  team?: string;
  category?: string;
  universe?: string;
  status?: string;
  strength?: string;
}

export const useSearchHero = (props: Props) => {
  return useQuery({
    queryKey: ["heroes", "search", props],
    queryFn: () => searchHeroesAction(props),
    staleTime: 1000 * 60 * 5,
  });
};
