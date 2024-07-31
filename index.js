import express from "express";
import dotenv from "dotenv";
import { stockRouter } from "./build/routes/routes.js";

const config = dotenv.config();
const PORT = config?.parsed?.PORT || "8081";

const app = express();

app.use(stockRouter);

app.listen(PORT, () => console.log(`App is listening on ${PORT}`));
