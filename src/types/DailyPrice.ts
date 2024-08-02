export const StockEntries = ["1. open", "2. high", "3. low", "4. close", "5. volume"] as const;
type StockEntry = typeof StockEntries[number];

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

type MetaData = {
  "1. Information": string;
  "2. Symbol": string;
  "3. Last Refreshed": string;
  "4. Output Size": string;
  "5. Time Zone": string;
};

export const MetaDataLabel = "Meta Data";
export const TimeSeriesLabel = "Time Series (Daily)";
export interface VantageData {
  [MetaDataLabel] : MetaData,
  [TimeSeriesLabel]: StockData
}

export interface StockDataPoint {
  date: string;
  "1. open": number;
  "2. high": number;
  "3. low": number;
  "4. close": number;
  "5. volume": number;
}
