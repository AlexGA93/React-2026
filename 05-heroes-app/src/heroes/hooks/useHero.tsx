import { useQuery } from "@tanstack/react-query";
import { getHeroAction } from "../actions/get-hero.action";

interface Props {
  slug: string;
}

export const useHero = ({ slug }: Props) => {
  return useQuery({
    queryKey: ["heroes", slug],
    queryFn: () => getHeroAction(slug),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
