<template>
  <div class="profile">
    <MenuComponent></MenuComponent>
    <ProfileComponent :userData="userData"></ProfileComponent>
  </div>
  <button @click="updatePassword">Update Password</button>
</template>
  
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import MenuComponent from '@/components/MenuComponent.vue';
import ProfileComponent from '@/components/ProfileComponent.vue';
import { userViewModel } from '@/viewmodels/UserViewModel';
import User from '@/model/user';


@Options({
  data() {
    return {
      userData: {} as User
    }
  },
  components: {
    MenuComponent: MenuComponent,
    ProfileComponent: ProfileComponent
  },
  methods: {
    async initProfilePage() {
      // Retrieve the User Data through the UserViewModel
      const tempUserData: User = await userViewModel.getUserData();

      // console.log('ProfileView > initProfilePage()');
      // console.log(tempUserData)

      // Set the User Data
      let user: User = new User(tempUserData.username, tempUserData.password, tempUserData.id, tempUserData.admin)
      this.userData = user
    },

    async updatePassword() {
      // What is this token?
      const token = sessionStorage.getItem('token')

      // What is the Response exactly? anonisnap: new user?
      const response = await fetch(`http://localhost:9090/users/${this.userData.id}?token=${token}`, {
        method: 'PATCH',                                      // HTTPS Operation
        headers: { 'Content-Type': 'application/json' },      // magic?
        body: JSON.stringify({ ...this.userData })            // Parse the new User Data into a string
      });

      // Handle the Response
      // Not a good handling tho...
      if (response.ok) {
        console.log('Password has been Updated');
        console.log(this.userData);
      } else {
        console.log('Password was not updated');
      }

    }
  },
  created() {
    this.initProfilePage()
  }
})
export default class ProfileView extends Vue {
  userData!: User;
}
</script>
  