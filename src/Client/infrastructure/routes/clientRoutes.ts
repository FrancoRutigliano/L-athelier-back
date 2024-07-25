import { Router, Request, Response } from "express";
import { clientRepositoryPrisma } from "../repository/clientRepositoryPrisma";
import { clientUseCases } from "../../application/clientUseCases";
import { clientController } from "../controller/clientController";


const ClientRouter= Router();
const path ="/api/client";

const ClientRepositoryPrisma = new clientRepositoryPrisma();

const ClientUseCases = new clientUseCases(ClientRepositoryPrisma);

const ClientController = new clientController(ClientUseCases)


 ClientRouter.get(`${path}`,(req:Request,res:Response) => {
     ClientController.getClients(req,res);
  });


 ClientRouter.get(`${path}/:id`,(req:Request,res:Response) => {
      ClientController.getClientById(req,res);
 });


ClientRouter.post(`${path}/new`,(req:Request,res:Response) => {
    ClientController.createClient(req,res);
 });

 
 ClientRouter.patch(`${path}/edit/:id`,(req:Request,res:Response) => {
    ClientController.editClient(req,res);
 });

 
 ClientRouter.delete(`${path}/delete/:id`,(req:Request,res:Response) => {
    ClientController.deleteClient(req,res);
 });

 export default ClientRouter