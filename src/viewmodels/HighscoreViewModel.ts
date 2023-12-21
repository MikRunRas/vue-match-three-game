/* eslint-disable */
import Highscore from '../model/highscore'

interface HighscoreData {
    gameid: number;
    userid: number;
    score: number;
  }
  
  const serverUrl = 'http://localhost:9090';
  
  const highscoreViewModel = {
    async getHighscores(): Promise<HighscoreData[]> {
      try {
        const token = sessionStorage.getItem('token');
        const gamesResponse = await fetch(`${serverUrl}/games?token=${token}`);
        

        if (!gamesResponse.ok) {
          throw new Error(`Failed to fetch highscores with status: ${gamesResponse.status}`);
        }
  
        const gamesData = await gamesResponse.json();

  
        // Extract high scores from games data
        const highScoresData = gamesData.map(async (highscore : Highscore) => {
          return {
            gameid: highscore.id,
            userid: highscore.user,
            score: highscore.score,
          };
        });
  
        // Wait for all user data requests to complete
        const resolvedHighScoresData = await Promise.all(highScoresData);
  
        // Sort the high scores by score
        resolvedHighScoresData.sort((a, b) => b.score - a.score);
  
        return resolvedHighScoresData;
      } catch (error) {
        console.error('Error fetching highscores:', error);
        // You might want to handle or propagate the error here
        throw error;
      }
    },
  };
  
  export default highscoreViewModel;
  