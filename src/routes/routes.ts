import express from "express";
import { getDailyStockData } from "../api/getDailyStockData.js";
import dotenv from "dotenv";
import { useMockData } from "../api/mockData.js";
import { transformStockData } from "../api/transformStockData.js";
import { computeMovingAverage } from "../stockAPI/computeMovingAverage.js";
import { StockDataPoint } from "../types/DailyPrice.js";
import { StockEntries } from "../types/DailyPrice.js";

const config = dotenv.config();
const isDevMode = config?.parsed?.MODE === 'dev';
const stockRouter = express.Router();

stockRouter.get('/', (_, res) => {
    res.send('Welcome to the Stock API');
});

stockRouter.get("/stock/:symbol", (req, res) => {
    if (isDevMode) {
        res.send(processStockData(useMockData()));
  } else {
      const stockData = getDailyStockData(req.params.symbol, "compact");
      stockData.then((data: any) => res.send(processStockData(data))).catch((error: any) => console.log(error));
  }
});

// Process incoming stock data, compute average and return desired format
function processStockData(stockData: any) {
      const data = transformStockData(stockData);
      let report = {} as StockDataPoint;

      StockEntries.forEach((e) => {
          let current: number[] = [];
          (data[1] as StockDataPoint[]).map((entry: StockDataPoint) => current.push((entry as any)[e]));
          const average = computeMovingAverage(current, 10)[0];
          report[e] = average;
      })
      return {'current values': (data[1] as StockDataPoint[])[0],'last updated': Object.values(data[0])[2], '10 days moving averages:': report};
}


export { stockRouter };
