<template>
    <div class="game">
      <MenuComponent></MenuComponent>
      <GameComponent></GameComponent>
      <p>Game</p>
    </div>
  </template>
  
  <script lang="ts">
  import { Options, Vue } from 'vue-class-component'
  import MenuComponent from '@/components/MenuComponent.vue';
import GameComponent from '@/components/GameComponent.vue';
  
  @Options({
    components: {
      MenuComponent: MenuComponent, 
      GameComponent: GameComponent, 
    }
  })
  export default class GameView extends Vue {}
  </script>
  