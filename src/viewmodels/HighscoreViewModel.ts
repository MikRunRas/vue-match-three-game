/* eslint-disable */
import Highscore from "../model/highscore";

const serverUrl = "http://localhost:9090";

const highscoreViewModel = {
  async getHighscores(): Promise<Highscore[]> {
    try {
      const token = sessionStorage.getItem("token");
      const gamesResponse = await fetch(`${serverUrl}/games?token=${token}`);

      if (!gamesResponse.ok) {
        throw new Error(
          `Failed to fetch highscores with status: ${gamesResponse.status}`
        );
      }

      const gamesData = await gamesResponse.json();

      // Extract high scores from games data
      const highScoresData = gamesData.map(
        async (highscore: Highscore) =>
          new Highscore(
            highscore.user,
            highscore.id,
            highscore.score,
            highscore.completed
          )
      );

      // Wait for all user data requests to complete
      const resolvedHighScoresData = await Promise.all(highScoresData);

      // Sort the high scores by score
      const sortedAndSliced = resolvedHighScoresData.sort((a, b) => b.score - a.score).slice(0,10);

      return sortedAndSliced;
    } catch (error) {
      console.error("Error fetching highscores:", error);
      // You might want to handle or propagate the error here
      throw error;
    }
  },
};

export default highscoreViewModel;
