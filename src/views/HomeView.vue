<template>
  <div class="home">
    <MenuComponent></MenuComponent>
    <p>home</p>
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
export default class HomeView extends Vue {}
</script>
