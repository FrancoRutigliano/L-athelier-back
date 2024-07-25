import express from "express";
import dotenv from "dotenv";
import EmployeeRouter from "./Employee/infrastructure/routes/employeeRoutes";
import SessionRouter from "./Session/infrastructure/routes/sessionRoutes";
import session from "express-session";
import { sessionEntity } from "./shared/infrastructure/middlewares/auth/entity/sessionEntity";
import ProductRouter from "./Product/infrastructure/routes/productRoutes";



dotenv.config();
export const app = express();

app.use(express.json());

app.use(EmployeeRouter);
app.use(SessionRouter);
app.use(ProductRouter);

const secretJWT = process.env.SECRET_JWT;
if (!secretJWT) {
  throw new Error("No hay clave secreta para JWT");
}

app.use(session({
  secret: secretJWT,
  resave: false,
  saveUninitialized: true,
}));

// Extendiendo el tipo de sesión para incluir la propiedad user
declare module "express-session" {
  interface SessionData {
    user: sessionEntity|null;
  }
}
