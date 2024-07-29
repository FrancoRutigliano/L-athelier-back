import { Result } from "../../shared/infrastructure/result/result";
import { clientEntity } from "../domain/clientEntity";
import { clientRepository } from "../domain/clientRepository";
import { clientCreate } from "../domain/dto/clientCreate";
import { clientUpdate } from "../domain/dto/clientUpdate";

export class clientUseCases{
    constructor(private readonly clientRepository: clientRepository){}

    public async getClients(): Promise<Result<clientEntity[]>> {
        const clients= await this.clientRepository.getClients();

        if(!clients){
            return Result.failure("Clients not found", 404);
        }
        return Result.success(clients,200);
      }

      public async getClientByID(id:string): Promise<Result<clientEntity>> {
            const client = await this.clientRepository.getClientById(id);

            if(!client){
                return Result.failure("Client not found", 404);
            }
            return Result.success(client,200);
      }
    
      public async createClient(fullName:string,email ?:  string): Promise<Result<clientEntity>> {
        const client:clientCreate={
            fullName:fullName
        }
        const clientCreated = await this.clientRepository.createClient(client);

        if(clientCreated==null){
            return Result.failure("Oops, something went wrong", 500);
        }
            return Result.success(clientCreated,200);
    
      }
    
      public async editClient(id: string,fullName: string,email?:string,descriptionProducts?:string): Promise<Result<clientEntity>> {
        const find= await this.clientRepository.getClientById(id)

        if(!find){
            return Result.failure("Client not found", 404);
        }

        const client :clientUpdate={
            fullName:fullName,
            descriptionProducts:descriptionProducts
        }

       const clientUpdated= await this.clientRepository.updateClient(id,client)

       if(!clientUpdated){
            return Result.failure("Oops, something went wrong", 500);
       }
        return Result.success(clientUpdated,200);
      }
    
      public async deleteClient(id: string): Promise<Result<clientEntity>> {
    
        const find= await this.clientRepository.getClientById(id)

        if(!find){
            return Result.failure("Client not found", 404);
        }

       const clientDeleted= await this.clientRepository.deleteClient(id)

       if(!clientDeleted){
            return Result.failure("Oops, something went wrong", 500);
       }
        return Result.success(clientDeleted,200);
      }
}