<template>
    <div class="highscore">
      <MenuComponent></MenuComponent>
      <HighscoreComponent :highscoreData="highscoreData"></HighscoreComponent>
    </div>
  </template>
  
  <script lang="ts">
  import { Options, Vue } from 'vue-class-component'
  import MenuComponent from '@/components/MenuComponent.vue';
  import HighscoreComponent from '@/components/HighscoreComponent.vue';
import Highscore from '@/model/highscore';
import highscoreViewModel from '@/viewmodels/HighscoreViewModel';
  
  @Options({
    data () {
    return{
        highscoreData: [] as Highscore[]
    }
  },
    components: {
      MenuComponent,
      HighscoreComponent
    },
    methods:{
      async initHighscorePage() {
  try {
    this.highscoreData = await highscoreViewModel.getHighscores();
  } catch (error) {
    // Handle error if necessary
    console.error('Error initializing highscore page:', error);
  }
}
    },
    created(){
        this.initHighscorePage()
    }
  })
  export default class HighscoreView extends Vue {
    highscoreData!: Highscore;}
  </script>
  