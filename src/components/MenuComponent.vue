<template>
  <div v-if="!isLoggedIn">
    <div>
      <label for="username">Username:</label>
      <input type="text" v-model="username" id="username">
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" v-model="password" id="password">
    </div>
    <button @click="handleLogin">Login</button>
    <button @click="handleSignup">Sign up</button>
  </div>
  <div class="navbar" v-else>
    <router-link to="/highscores">Highscores</router-link>
    <router-link to="/profile">Profile</router-link>
    <router-link to="/game">Game</router-link>
    <button @click="handleLogOut">Log out</button>
  </div>
</template>

<style>
.navbar>* {
  margin: 5px;
}
</style>

<script lang="ts">
import App from '@/App.vue';
import { userViewModel } from '@/viewmodels/UserViewModel';
import { Options } from 'vue-class-component';
export default {
  // @Options({})
  // Properties returned from data() become reactive state
  // and will be exposed on `this`.
  data() {
    return {
      username: '',
      password: '',
      isLoggedIn: false
    }
  },
  created() {
    // Call the method when the component is created
    this.init();
  },

  // Methods are functions that mutate state and trigger updates.
  // They can be bound as event handlers in templates.
  methods: {
    init() {
      if (sessionStorage.getItem("isLoggedIn")) {
        this.isLoggedIn = true;
      }
    },
    async handleLogin() {
      console.log('Attempting to Log In');
      console.log(`Username: ${this.username} | Password: ${this.password}`)

      const userFound = await userViewModel.handleLogin(this.username, this.password);
      // Check if the login was successful and if a user object is returned
      if (userFound) {
        sessionStorage.setItem("isLoggedIn", "true")
        sessionStorage.setItem("loggedInUserName", userFound.user.username)
        sessionStorage.setItem("loggedInUserId", userFound.user.id.toString())
        this.isLoggedIn = true;
        // Push the route to the user profile page with the user ID as a parameter
        this.$router.push("/profile");
      } else {
        // Handle unsuccessful login
        console.error('Login failed');
      }
    },

    async handleSignup() {
      await userViewModel.handleSignup(this.username, this.password);
    },
    async handleLogOut() {
      this.isLoggedIn = false;
      sessionStorage.clear()
      this.$router.push('/');
    },
  }
}
</script>
