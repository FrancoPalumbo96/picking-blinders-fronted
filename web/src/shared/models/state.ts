export class State {
  id: number;
  name: string;


  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  static fromJsonObject(jsonObject: any): State {
    return new State(jsonObject.id, jsonObject.name);
  }
}
