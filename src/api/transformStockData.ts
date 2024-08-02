import { MetaDataLabel, StockData, StockDataPoint, TimeSeriesLabel, VantageData } from '../types/DailyPrice.js';

/**
 * Transforms incoming Vantage data to metadata + data array
 * @param data raw data from Vantage
 */
export function transformStockData(data: any) {
    const vantageData: VantageData = data;
    const metaData = vantageData[MetaDataLabel];
    const timeSeriesData = vantageData[TimeSeriesLabel];
    const parsedTimeSeriesData: StockDataPoint[] = parseStockData(timeSeriesData);
    return [
        metaData, parsedTimeSeriesData
    ]
}

/**
 * Helper function to parse raw stock data entry to an internal format
 * @param data raw entry of Vantage data
 * @returns 
 */
function parseStockData(data: StockData): StockDataPoint[] {
    const keys: string[] = Object.keys(data)
    let output: StockDataPoint[] = [];
    keys.forEach((k: string)=>{
        const dailyDataPoint= Object.entries(data[k]).reduce((accum, [k, v])=>{
           (accum as any)[k]=Number(v);
            return accum;
        },[]);
        output.push({'date': k, ...dailyDataPoint as any})
    })
    return output;
}
