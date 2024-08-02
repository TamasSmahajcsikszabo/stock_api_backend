import dotenv from "dotenv";
const config = dotenv.config();

export function checkSymbolURL(symbol: string) {
  const url = new URL("query", config?.parsed?.BASE_URL);
  url.searchParams.append("function", "SYMBOL_SEARCH");
  url.searchParams.append("keywords", symbol);
  url.searchParams.append("apikey", String(config?.parsed?.API_KEY));
  return url;
}
