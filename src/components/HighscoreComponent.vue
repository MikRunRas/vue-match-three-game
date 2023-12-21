<template>
    <div>
        <div>
      <h2>All High Scores</h2>
      <ol v-if="highscoreData && highscoreData.length > 0">
        <p v-for="score in highscoreData" :key="score.score">User id:{{ score.userid }} Score: {{ score.score }}</p>
      </ol>
      <h2>Your top three highscores</h2>
      <ol v-if="userTopScoresData && userTopScoresData.length > 0">
        <p v-for="score in userTopScoresData" :key="score.score">User id:{{ score.userid }} Score: {{ score.score }}</p></ol>
      <p v-else>Log in to see highscores.</p>
        </div>
    </div>
  </template>

<script lang="ts">
export default {
    data() {
    return{
        userTopScoresData: []
    }},
  props: {
    highscoreData: {
      type: Array,
      required: true
    }
  },
};
</script>