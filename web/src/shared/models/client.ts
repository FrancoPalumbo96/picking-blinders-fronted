import {Order} from "./order";

export class Client {
  id: number;
  firstName: string;
  lastName: string;
  dni: string;
  phoneNumber: string;
  mail: string;
  cuit: string;
  orders?: Order[];

  constructor(id: number, firstName: string, lastName: string, dni: string, phoneNumber: string, mail: string, cuit: string,
              orders?: Order[]) {
    this.id = id;
    this.firstName = firstName;
    this.mail = mail;
    this.lastName = lastName;
    this.dni = dni;
    this.phoneNumber = phoneNumber;
    this.orders = orders ? orders : [];
  }

  static fromJsonObject(jsonObject: any): Client {
    return new Client(jsonObject.id, jsonObject.firstName, jsonObject.lastName, jsonObject.dni, jsonObject.phoneNumber, jsonObject.mail,
      jsonObject.cuit, jsonObject.orders.map((order) => Order.fromJsonObject(order)));
  }
}
