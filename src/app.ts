import express from "express";
import dotenv from "dotenv";
import EmployeeRouter from "./Employee/infrastructure/routes/employeeRoutes";
import SessionRouter from "./Session/infrastructure/routes/sessionRoutes";
import ClientRouter from "./Client/infrastructure/routes/clientRoutes";
//import session from "express-session";
//import { sessionEntity } from "./shared/infrastructure/middlewares/auth/entity/sessionEntity";
//import { MemoryStore } from 'express-session';



dotenv.config();
export const app = express();

app.use(express.json());

app.use(EmployeeRouter);
app.use(SessionRouter);
app.use(ClientRouter);

const secretJWT = process.env.SECRET_JWT;
if (!secretJWT) {
  throw new Error("No hay clave secreta para JWT");
}

// declare module "express-session" {
//   interface SessionData {
//     user?: sessionEntity; //defino como sera el atributo user de las req.session.user
//   }
// }


// app.use(session({
//   cookie: { maxAge: 86400000 },
//   store: new MemoryStore({

//   }),
//   resave: false,
//   secret: 'keyboard cat'
// }))


