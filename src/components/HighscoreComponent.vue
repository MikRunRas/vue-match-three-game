<template>
  <div>
    <div>
      <h2>Top Ten Highscores</h2>
      <ol v-if="highscoreData && highscoreData.length > 0">
        <p v-for="score in highscoreData" :key="score.score">User id:{{ score.user }} Score: {{ score.score }}</p>
      </ol>

      <h2>Your top three highscores</h2>
      <!-- Show if UserTopScoresData has more than 0 items-->
      <ol v-if="userTopScoresData && userTopScoresData.length > 0">
        <p v-for="score in userTopScoresData" :key="score.score">User id:{{ score.user }} Score: {{ score.score }}</p>
      </ol>
      <p v-else>Log in to see highscores.</p>
    </div>
  </div>
</template>

<script lang="ts">
import Highscore from '@/model/highscore';

export default {
  data() {
    return {
      userTopScoresData: []
    }
  },
  props: {
    highscoreData: {
      type: Array, // What is this array?
      required: true
    }
  },

  // Called upon Component Initialisation
  beforeUpdate() {
    // Get User ID through Session Storage
    const userId = sessionStorage.getItem('userId')

    // Filter and compare using User ID
    this.userTopScoresData = this.highscoreData
      .filter((score: Highscore) => Number(score.user) === Number(userId))
      // .sort((a: Highscore, b: Highscore) => b.score > a.score) // Extra sort if necessary
      .slice(0, 3);
  }
};
</script>