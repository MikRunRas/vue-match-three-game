<template>
    <div class="profile">
      <MenuComponent></MenuComponent>
      <ProfileComponent :userData="userData" ></ProfileComponent>
    </div>
  </template>
  
  <script lang="ts">
  import { Options, Vue } from 'vue-class-component'
  import MenuComponent from '@/components/MenuComponent.vue';
  import ProfileComponent from '@/components/ProfileComponent.vue';
  import userViewModel from '@/viewmodels/UserViewModel';
  import User from '@/model/user';

  
  @Options({
  data () {
    return{
        userData: {} as User
    }
  },
    components: {
      MenuComponent,
      ProfileComponent
    },
    methods:{
        async initProfilePage(){
            const tempUserData =  await userViewModel.getUserData();
            console.log("TEMP: ", tempUserData)
            this.userData = new User(tempUserData.username, tempUserData.password, tempUserData.id, tempUserData.admin)
        }
    },
    created(){
        this.initProfilePage()
    }
  })
  export default class ProfileView extends Vue {
  userData!: User;
}
  </script>
  