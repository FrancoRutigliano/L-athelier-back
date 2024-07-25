import { clientEntity } from "./clientEntity";
import { clientCreate } from "./dto/clientCreate";
import { clientUpdate } from "./dto/clientUpdate";

export interface clientRepository{

    getClients():Promise<clientEntity[]|null>
    getClientById(id:string):Promise<clientEntity|null>
    createClient(client:clientCreate):Promise<clientEntity|null>
    deleteClient(id:string):Promise<clientEntity|null>
    updateClient(id:string,client:clientUpdate):Promise<clientEntity|null>
}