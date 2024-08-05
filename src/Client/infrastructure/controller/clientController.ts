import { clientUseCases } from "../../application/clientUseCases";
import e, {Request,Response} from "express"

export class clientController{
    constructor(private readonly clientUseCases:clientUseCases){}
    
    public getClients=async(req:Request,res:Response)=>{
        const result = await this.clientUseCases.getClients();

        if(result.isSuccess){
            return res.status(result.statusCode).json({'message': result.value, 'details': true});
        }
        return res.status(result.statusCode).json({'message': result.error, 'details': false});

    }

    public getClientById=async(req:Request,res:Response)=>{
        const {id} = req.params;
        const result = await this.clientUseCases.getClientByID(id)

        if (result.isSuccess) {
            return res.status(result.statusCode).json({'message': result.value, 'details': true});
        }
        return res.status(result.statusCode).json({'message': result.error, 'details': false});
    }

    public createClient=async(req:Request,res:Response)=>{
        const {fullName}= req.body;
        const result = await this.clientUseCases.createClient(fullName);
        
        if (result.isSuccess) {
            return res.status(result.statusCode).json({'message': result.value, 'details': true});
        }
        return res.status(result.statusCode).json({'message': result.error, 'details': false});
    }

    public editClient=async(req:Request,res:Response)=>{
        const {id}= req.params;
        const {fullName,descriptionProducts, phone}= req.body;
        const result = await this.clientUseCases.editClient(id, fullName, descriptionProducts, phone)
        
        if (result.isSuccess) {
            return res.status(result.statusCode).json({'message': result.value, 'details': true});
        }

        return res.status(result.statusCode).json({'message': result?.error, 'details': false});
    }

    public deleteClient=async(req:Request,res:Response)=>{
        const {id}= req.params;
        const result = await this.clientUseCases.deleteClient(id);
        if(result.isSuccess) {
            return res.status(result.statusCode).json({'message': result.value, 'details': true});
        }

        return res.status(result.statusCode).json({'message': result.error, 'details': false});
    }
}