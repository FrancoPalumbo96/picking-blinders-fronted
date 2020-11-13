import {Client} from "./client";
import {ProductQuantity} from "./productQuantity";

export class Order {
  id: number;
  zone: string;
  client: Client;
  productQuantity: ProductQuantity[];

  constructor(id: number, zone: string, client: Client, productQuantity: ProductQuantity[]) {
    this.id = id;
    this.zone = zone;
    this.client = client;
    this.productQuantity = productQuantity;
  }

  static fromJsonObject(jsonObject: any): Order {
    return new Order(jsonObject.id, jsonObject.zone, jsonObject.client, jsonObject.productQuantity);
  }
}
