import {Box} from "./box";

export class Label {
  id: number;
  printed: boolean;
  box: Box;


  constructor(id: number, printed: boolean, box: Box) {
    this.id = id;
    this.printed = printed;
    this.box = box;
  }

  static fromJsonObject(jsonObject: any): Label {
    return new Label(jsonObject.id, jsonObject.printed, jsonObject.box);
  }
}
