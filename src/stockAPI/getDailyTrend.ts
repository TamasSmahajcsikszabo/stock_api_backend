import dotenv from "dotenv";
const config = dotenv.config();

export function getDailyTrend(symbol: string, outputsize: string) {
  const url = new URL("query", config?.parsed?.BASE_URL);
  url.searchParams.append("function", "TIME_SERIES_DAILY");
  url.searchParams.append("symbol", symbol);
  url.searchParams.append("apikey", String(config?.parsed?.API_KEY));
  url.searchParams.append("outputsize", outputsize);
  return url;
}
