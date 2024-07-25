import { prisma } from "../../../shared/infrastructure/data/prisma";
import { clientEntity } from "../../domain/clientEntity";
import { clientRepository } from "../../domain/clientRepository";
import { clientCreate } from "../../domain/dto/clientCreate";
import { clientUpdate } from "../../domain/dto/clientUpdate";

export class clientRepositoryPrisma implements clientRepository{

    async getClients(): Promise<clientEntity[] | null> {
        return await prisma.client.findMany()
    }
    async getClientById(id: string): Promise<clientEntity | null> {
       return await prisma.client.findUnique({
        where:{
            id:id
       }})
    }
    async createClient(client: clientCreate): Promise<clientEntity | null> {
        return await prisma.client.create(
            { data:client }
        )
    }
    async deleteClient(id: string): Promise<clientEntity | null> {
        return await prisma.client.delete({
            where:{
                id:id
            }
        })
    }
    async updateClient(id: string, client: clientUpdate): Promise<clientEntity | null> {
        return await prisma.client.update({
            where:{id:id},
            data:client
        })
    }

}