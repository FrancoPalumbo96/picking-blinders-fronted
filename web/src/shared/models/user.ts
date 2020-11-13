export class User {
  id: number;
  firstName: string;
  lastName: string;
  dni: string;
  phoneNumber: string;
  mail: string;

  constructor(id: number, firstName: string, mail: string, lastName: string, dni: string, phoneNumber: string) {
    this.id = id;
    this.firstName = firstName;
    this.mail = mail;
    this.lastName = lastName;
    this.dni = dni;
    this.phoneNumber = phoneNumber;
  }

  static fromJsonObject(jsonObject: any): User {
    return new User(jsonObject.id, jsonObject.name, jsonObject.email, jsonObject.name, jsonObject.dni, jsonObject.phoneNumber);
  }
}
