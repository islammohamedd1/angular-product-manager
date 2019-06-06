import { Injectable } from '@angular/core';
import { Product } from './Product';
import { PRODUCTS } from './mock-products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  products: Product[];

  constructor() {
    this.products = PRODUCTS;
  }

  getAll(): Product[] {
    return this.products;
  }

  get(sku: Number): Product {
    const result = this.products.find(p => p.sku === sku);
    return result;
  }

  addProduct(newProduct: Product): void {
    this.products.push(newProduct);
  }

  deleteProduct(sku: Number): void {
    let productIndex = this.products.findIndex(p => (p.sku === sku));
    if (productIndex > -1) {
      this.products.splice(productIndex, 1);
    }
  }

  updateProduct(updatedProduct: Product) {
    let productIndex = this.products.findIndex(p => (p.sku === updatedProduct.sku));
    this.products[productIndex] = updatedProduct;
  }
}
