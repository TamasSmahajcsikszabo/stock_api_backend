import axios from "axios";
import { checkSymbolURL } from "../api/checkSymbolURL.js";

export async function checkSymbol(symbol: string) {
  const checkRequest = checkSymbolURL(symbol);
  const checkResult = await axios.get(checkRequest.toString());
  return checkResult;
}
