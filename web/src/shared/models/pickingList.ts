import {Box} from "./box";
import {PickingListProductQuantity} from "./pickingListProductQuantity";

export class PickingList {
  id: number;
  box: Box;
  pickingListProductQuantities: PickingListProductQuantity[];


  constructor(id: number, box: Box, pickingListProductQuantities: PickingListProductQuantity[]) {
    this.id = id;
    this.box = box;
    this.pickingListProductQuantities = pickingListProductQuantities;
  }

  static fromJsonObject(jsonObject: any): PickingList {
    return new PickingList(jsonObject.id, jsonObject.box, jsonObject.pickingListProductQuantities);
  }
}
