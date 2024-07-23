import { prisma } from "../../../shared/infrastructure/data/prisma";
import { productCreate } from "../../domain/dto/productCreate";
import { productUpdate } from "../../domain/dto/productUpdate";
import { productEntity } from "../../domain/productEntity";
import { productRepository } from "../../domain/productRepository";

export class productRepositoryPrisma implements productRepository{
    
    async getProducts(): Promise<productEntity[] | null> {
       return await prisma.product.findMany()
    }
    async getProductById(id: string): Promise<productEntity | null> {
        return await prisma.product.findUnique({
            where:{
                id:id
            }
        })
    }
    async createProduct(product: productCreate): Promise<productEntity> {
        throw new Error("Method not implemented.");
    }
    async editProduct(id: string, product: productUpdate): Promise<productEntity | null> {
        throw new Error("Method not implemented.");
    }
    async deleteProduct(id: string): Promise<productEntity | null> {
        throw new Error("Method not implemented.");
    }

}