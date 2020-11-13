import {Station} from "./station";

export class Product {
  id: number;
  station: Station;
  name: string;
  volume: number;

  constructor(id: number, station: Station, name: string, volume: number) {
    this.id = id;
    this.station = station;
    this.name = name;
    this.volume = volume;
  }

  static fromJsonObject(jsonObject: any): Product {
    return new Product(jsonObject.id, jsonObject.station, jsonObject.name, jsonObject.volume);
  }
}
