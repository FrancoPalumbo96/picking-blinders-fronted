import {Box} from "./box";
import {Product} from "./product";
import {PickingList} from "./pickingList";

export class PickingListProductQuantity {
  id: number;
  quantity: number;
  missingQuantity: number;
  product: Product;
  pickingList: PickingList;


  constructor(id: number, quantity: number, missingQuantity: number, product: Product, pickingList: PickingList) {
    this.id = id;
    this.quantity = quantity;
    this.missingQuantity = missingQuantity;
    this.product = product;
    this.pickingList = pickingList;
  }

  static fromJsonObject(jsonObject: any): PickingListProductQuantity {
    return new PickingListProductQuantity(jsonObject.id, jsonObject.quantity, jsonObject.missingQuantity, jsonObject.product, jsonObject.pickingList);
  }
}
