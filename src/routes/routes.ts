import express from "express";
import { getDailyStockData } from "../api/getDailyStockData.js";
import { StockData } from "../types/DailyPrice.js";
const stockRouter = express.Router();
const dataLabel: string = "Time Series (Daily)";

stockRouter.get("/stock/raw/:symbol", (req, res) => {
  const stockData = getDailyStockData(req.params.symbol, "compact");
  stockData
    .then((data) => res.send((data as any)[dataLabel] as StockData[]))
    .catch((error) => console.log(error));
});

stockRouter.get("/stock/:symbol", (req, res) => {
  const stockData = getDailyStockData(req.params.symbol, "compact");
  stockData
    .then((data) => {
      try {
        // const stockValues = Object.values((data as any)[dataLabel]) as StockData[];
        res.send(data);
      } catch (error) {
        console.log(error);
      }
    })
    .catch((error) => console.log(error));
});

export { stockRouter };
