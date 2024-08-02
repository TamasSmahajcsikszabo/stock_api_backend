import axios from "axios";
import { getDailyTrendURL } from "../api/getDailyTrendURL.js";
import { StockData } from "../types/DailyPrice.js";

export async function getDailyStockData(symbol: string, outputsize: string) {
  const getDailyTockUrl = getDailyTrendURL(symbol, outputsize);
  const stockdata = await axios.get(getDailyTockUrl.toString());
  return stockdata.data as StockData[];
}
