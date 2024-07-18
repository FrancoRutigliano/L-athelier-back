import express from "express";
import dotenv from "dotenv"
import EmployeeRouter from "./Employee/infrastructure/routes/employeeRoutes";

dotenv.config()
export const app = express();
app.use(express.json())


app.use(EmployeeRouter);