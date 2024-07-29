import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import EmployeeRouter from "./Employee/infrastructure/routes/employeeRoutes";
import SessionRouter from "./Session/infrastructure/routes/sessionRoutes";
import ClientRouter from "./Client/infrastructure/routes/clientRoutes";
import  {verifyConecction}  from "./config/cors";




dotenv.config();
export const app = express();

//app.use(verifyConecction);
//app.use(cors());
app.use(express.json());

app.use(EmployeeRouter);
app.use(SessionRouter);
app.use(ClientRouter);

const secretJWT = process.env.SECRET_JWT;
if (!secretJWT) {
  throw new Error("No hay clave secreta para JWT");
}



