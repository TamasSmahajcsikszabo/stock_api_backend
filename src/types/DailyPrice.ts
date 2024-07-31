type StockEntry = "1. open" | "2. high" | "3. low" | "4. close" | "5. volume";

type StockDataEntry = {
  [label in StockEntry]: string;
};

export interface StockData {
  [date: string]: StockDataEntry;
}

export interface ReportStockData {
  current: string;
  lastUpdated: string;
  movingAverage: string;
}
