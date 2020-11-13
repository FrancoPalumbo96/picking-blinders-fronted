import {Order} from "./order";
import {Product} from "./product";

export class ProductQuantity {
  id: number;
  order: Order;
  product: Product;
  quantity: number;

  constructor(id: number, order: Order, product: Product, quantity: number) {
    this.id = id;
    this.order = order;
    this.product = product;
    this.quantity = quantity;
  }

  static fromJsonObject(jsonObject: any): ProductQuantity {
    return new ProductQuantity(jsonObject.id, jsonObject.order, jsonObject.product, jsonObject.quantity);
  }
}
