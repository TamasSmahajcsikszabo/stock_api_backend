import { getDailyTrend } from "../stockAPI/getDailyTrend.js";
import { StockData } from "../types/DailyPrice.js";
import axios from "axios";

export async function getDailyStockData(symbol: string, outputsize: string) {
  const getDailyTockUrl = getDailyTrend(symbol, outputsize);
  const stockdata = await axios.get(getDailyTockUrl.toString());
  return stockdata.data as StockData[];
}
