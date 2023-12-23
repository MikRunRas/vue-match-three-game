/* eslint-disable */
import Highscore from "../model/highscore";

const serverUrl = "http://localhost:9090";

const gameViewModel = {
  async saveHighScore(score: number, id: number): Promise<void> {
    try {
      console.log("SAVING HIGHSCORE");
      // Retrieve the user ID from the session
      const token = sessionStorage.getItem('token');

      console.log("token: ", token);

      const response = await fetch(`${serverUrl}/games/${id}?token=${token}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ score, completed: true }),
      });

      if (!response.ok) {
        console.error('Save high score failed:', response.status);
        // Handle error as needed
        return Promise.reject(`Save high score failed: ${response.status}`);
      }
    } catch (error) {
      console.error('Error saving high score:', error);
      // Handle error as needed
      throw error;
    }
  },

  async createGame(score : number): Promise<void> {
    try {
      // Retrieve the user ID from the session
      const token = sessionStorage.getItem('token');
      const userId = sessionStorage.getItem('userId');

      console.log("CREATING GAME");
      console.log("token: ", token);
      console.log("userid: ", userId);
      
      const response = await fetch(`${serverUrl}/games?token=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      const responseData = await response.json();
      const gameid = responseData.id

      console.log("GAME CREATED");

      if (!response.ok) {
        console.error('Create game failed:', response.status);
        // Handle error as needed
        return Promise.reject(`Create game failed: ${response.status}`);
      }

      this.saveHighScore(score, gameid)

    } catch (error) {
      console.error('Error creating game:', error);
      // Handle error as needed
      throw error;
    }
  },
  
};

export default gameViewModel;
