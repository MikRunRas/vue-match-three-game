export default class User {
    username: string;
    password: string | null;
    id: number;
    admin: boolean | null;
  
    constructor(username: string, password: string | null, id: number, admin: boolean | null) {
      this.username = username;
      this.password = password;
      this.id = id;
      this.admin = admin;
    }
  }
  