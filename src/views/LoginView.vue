<template>
    <div class="login">
      <MenuComponent></MenuComponent>
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
  export default class LoginView extends Vue {}
  </script>
  