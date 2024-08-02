import { checkSymbolURL } from "../stockAPI/checkSymbolURL.js";
import axios from "axios";

export async function checkSymbol(symbol: string) {
  const checkRequest = checkSymbolURL(symbol);
  const checkResult = await axios.get(checkRequest.toString());
  return checkResult;
}
