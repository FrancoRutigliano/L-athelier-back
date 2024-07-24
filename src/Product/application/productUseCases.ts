import { Result } from "../../shared/infrastructure/result/result";

import { productRepository } from "../domain/productRepository";
import { productEntity } from "../domain/productEntity";
import { productCreate } from "../domain/dto/productCreate";
import { productUpdate } from "../domain/dto/productUpdate";

export class productUseCase {
  constructor(private readonly productsRepository: productRepository) {}

  public async getProducts(): Promise<Result<productEntity[]>> {
    const products = await this.productsRepository.getProducts();

    if (!products) {
      return Result.failure("Products not found", 404);
    }
    return Result.success(products, 200);
  }

  public async getProductById(id: string): Promise<Result<productEntity>> {
    const product = await this.productsRepository.getProductById(id);
    if (!product) {
      return Result.failure("Product not found", 404);
    }
    return Result.success(product, 200);
  }

  public async createProduct(name: string): Promise<Result<productEntity>> {
    const product: productCreate = {
      name: name,
    };

    const find = await this.productsRepository.findProductByName(name);
    if (find) {
      return Result.failure("Product already exists", 409);
    }

    const productCreated = await this.productsRepository.createProduct(product);

    if (!productCreated) {
      return Result.failure("Oops, something went wrong", 500);
    }
    return Result.success(productCreated, 201);
  }

  public async editProduct(id: string,name: string): Promise<Result<productEntity>> {
    const product: productUpdate = {
      name: name,
    };
    const existProduct = await this.productsRepository.getProductById(id)

    if(!existProduct){
      return Result.failure("Product not found", 404)
    }

    const productUpdated = await this.productsRepository.editProduct(
      id,
      product
    );

    if (!productUpdated) {
      return Result.failure("Oops, something went wrong", 500);
    }
    return Result.success(productUpdated, 200);
  }

  public async deleteProduct(id: string): Promise<Result<productEntity>> {

    const product = await this.productsRepository.getProductById(id)

    if(!product){
      return Result.failure("Product not found", 404)
    }

    const productDeleted = await this.productsRepository.deleteProduct(id);

    if (!productDeleted) {
      return Result.failure("Oops, something went wrong", 500);
    }

    return Result.success(productDeleted, 200);
  }
}
