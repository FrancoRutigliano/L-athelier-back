import express from "express";
import dotenv from "dotenv";
import EmployeeRouter from "./Employee/infrastructure/routes/employeeRoutes";
import SessionRouter from "./Session/infrastructure/routes/sessionRoutes";
import session from "express-session";
import { sessionEntity } from "./shared/infrastructure/middlewares/auth/entity/sessionEntity";



dotenv.config();
export const app = express();

app.use(express.json());

app.use(EmployeeRouter);
app.use(SessionRouter);

const secretJWT = process.env.SECRET_JWT;
if (!secretJWT) {
  throw new Error("No hay clave secreta para JWT");
}

declare module "express-session" {
  interface SessionData {
    user?: sessionEntity; //defino como sera el atributo user de las req.session.user
  }
}

app.use(session({  //configuro para que la app utilize las sessiones de express
  secret: secretJWT,
  resave: false,
  saveUninitialized: true,
}));


