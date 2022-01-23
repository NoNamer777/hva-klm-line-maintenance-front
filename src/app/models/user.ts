export class User {
  id: string;
  name: string;
  password: string;
  role: string;
  status: string;
  token: string;


  constructor(name: string,  role: string, status: string, password?: string) {
    this.name = name;
    this.password = password;
    this.role = role;
    this.status = status;
  }


}
