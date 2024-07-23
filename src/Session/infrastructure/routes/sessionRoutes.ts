import { Router,Request,Response } from "express";
import { sessionRepositoryPrisma } from "../repository/sessionRepositoryPrisma";
import { sessionUseCase } from "../../application/sessionUseCases";
import { sessionController } from "../controller/sessionController";

const SessionRouter = Router();
const path="/api/session"

const SessionRepositoryPrisma= new sessionRepositoryPrisma();

const SessionUseCases = new sessionUseCase(SessionRepositoryPrisma);

const SessionController = new sessionController(SessionUseCases);

SessionRouter.post(`${path}/login`,(req:Request,res:Response) => {
    SessionController.login(req,res);
 });


export default SessionRouter