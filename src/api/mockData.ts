// Mock data to not consume API rate limit
import data from "../data/data.json" assert { type: "json" };

export function useMockData() {
  return data;
}
