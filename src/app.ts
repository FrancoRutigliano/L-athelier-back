import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import EmployeeRouter from "./Employee/infrastructure/routes/employeeRoutes";
import SessionRouter from "./Session/infrastructure/routes/sessionRoutes";
import ClientRouter from "./Client/infrastructure/routes/clientRoutes";
import cookieParser from 'cookie-parser';




dotenv.config();
export const app = express();

app.use(express.json());
app.use(cookieParser())

app.use(cors({
  origin: 'http://localhost:5173', // Cambia esto al origen de tu frontend
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(SessionRouter);
app.use(EmployeeRouter);
app.use(ClientRouter);

const secretJWT = process.env.SECRET_JWT;
if (!secretJWT) {
  throw new Error("No hay clave secreta para JWT");
}



