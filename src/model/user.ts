export default class User {
    id: number;
    username: string;
    password: string;
    
    admin: boolean;
  
    constructor(username: string, password: string, id: number, admin: boolean = false) {
      this.username = username;
      this.password = password;
      this.id = id;
      this.admin = admin;
    }
  }
  