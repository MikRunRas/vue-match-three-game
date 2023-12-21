export default class Highscore {
    user: number;
    id: number;
    score: number;
    completed: boolean | null;
  
    constructor(user: number, id: number, score: number, completed: boolean) {
      this.user = user;
      this.id = id;
      this.score = score;
      this.completed = completed;
    }
  }
  