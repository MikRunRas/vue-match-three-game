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
        headers: { 'Content-Type': 'application/json' },      // magic? Rune says: "We send JSON" cuz blah blah policies blah blah
        body: JSON.stringify({ ...this.userData })            // Parse the new User Data into a string
      });

      // Handle the Response
      const infoMessage = response.ok
        ? 'Password has been Updated'
        : 'Error when updating Password'

      // Inform the User of the outcome
      alert(infoMessage)
    }
  },
  created() {
    this.initProfilePage()
  }
})

// What is happening here?
export default class ProfileView extends Vue {
  userData!: User;
}

</script>
  