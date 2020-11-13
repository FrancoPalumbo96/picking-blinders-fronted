export class Station {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  static fromJsonObject(jsonObject: any): Station {
    return new Station(jsonObject.id, jsonObject.name);
  }
}
