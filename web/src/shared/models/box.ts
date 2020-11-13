import {Order} from "./order";
import {State} from "./state";
import {PickingList} from "./pickingList";

export class Box {
  id: number;
  boxNumber: number;
  totalBoxes: number;
  state: State;
  order: Order;
  pickingLists: PickingList[];


  constructor(id: number, boxNumber: number, totalBoxes: number, state: State, order: Order, pickingLists: PickingList[]) {
    this.id = id;
    this.boxNumber = boxNumber;
    this.totalBoxes = totalBoxes;
    this.state = state;
    this.order = order;
    this.pickingLists = pickingLists;
  }

  static fromJsonObject(jsonObject: any): Box {
    return new Box(jsonObject.id, jsonObject.boxNumber, jsonObject.totalBoxes, jsonObject.state, jsonObject.order, jsonObject.pickingListsw);
  }
}
