import { heroApi } from "../api/hero.api";
import type { SummaryResponse } from "../types/get-summary.response";

export const getSummaryAction = async (): Promise<SummaryResponse> => {
  const { data } = await heroApi.get<SummaryResponse>("/summary");

  console.log({ data });

  return { ...data };
};
