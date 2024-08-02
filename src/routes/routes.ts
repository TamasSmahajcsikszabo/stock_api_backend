import cron from "node-cron";
import dotenv from "dotenv";
import express from "express";
import { checkSymbol } from "../lib/checkSymbol.js";
import { computeMovingAverage } from "../lib/computeMovingAverage.js";
import { getCurrentTime } from "../lib/getCurrentTime.js";
import { getDailyStockData } from "../lib/getDailyStockData.js";
import { transformStockData } from "../lib/transformStockData.js";
import { useMockData } from "../lib/mockData.js";
import { StockDataPoint } from "../types/DailyPrice.js";
import { StockEntries } from "../types/DailyPrice.js";

const config = dotenv.config();
const isDevMode = config?.parsed?.MODE === "dev";
const stockRouter = express.Router();

stockRouter.get("/", (_, res) => {
  res.send("Welcome to the Stock API");
});

stockRouter.get("/stock/:symbol", (req, res) => {
  const symbol: string = req.params.symbol;
  if (isDevMode) {
    console.log("Running in DEV mode!");
    res.send(processStockData(useMockData()));
  } else {
    getDailyStockData(symbol, "compact")
      .then((data: any) => res.send(processStockData(data)))
      .catch((error: any) => {
        console.log(`Error occured: ${error}`);
        try {
          console.log("Running symbol validity check...");
          const checkSymbolResult = checkSymbol(symbol);
          checkSymbolResult
            .then((result) => res.send(result))
            .catch((error) => console.log(error));
        } catch (error) {
          console.log(error);
        }
      });
  }
});

//TODO stop scheduler?
stockRouter.put("/stock/:symbol", (req, res) => {
  cron.schedule("* 1 * * *", () => {
    getDailyStockData(req.params.symbol, "compact")
      .then((data: any) => res.send(processStockData(data)))
      .catch((error: any) => console.log(error));
  });
});

// Process incoming stock data, compute average and return desired format
function processStockData(stockData: any) {
  const data = transformStockData(stockData);
  let report = {} as StockDataPoint;

  StockEntries.forEach((e) => {
    let current: number[] = [];
    (data[1] as StockDataPoint[]).map((entry: StockDataPoint) =>
      current.push((entry as any)[e]),
    );
    const average = computeMovingAverage(current, 10)[0];
    report[e] = average;
  });
  return {
    "current values": (data[1] as StockDataPoint[])[0],
    "last updated": getCurrentTime(),
    "10 days moving averages": report,
  };
}

export { stockRouter };
