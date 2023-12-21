<template>
    <div class="game">
      <MenuComponent></MenuComponent>
      <p>Game</p>
    </div>
  </template>
  
  <script lang="ts">
  import { Options, Vue } from 'vue-class-component'
  import MenuComponent from '@/components/MenuComponent.vue';
  
  @Options({
    components: {
      MenuComponent
    }
  })
  export default class GameView extends Vue {}
  </script>
  