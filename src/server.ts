import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";

const app: Express = express();

dotenv.config();

const PORT = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
 res.status(200).json("Hello from the server!!!");
});

app.listen(PORT, () => {
 console.log(`App is listening on port ${PORT}`);
});