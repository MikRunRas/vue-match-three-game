<template>
    <div>
      <h1>User Profile</h1>
      <p>User ID: {{ userData.id }}</p>
      <p v-if="userData.username">Username: {{ userData.username }}</p>
      <p v-else>Username: None of your business.</p>
      <p v-if="userData.password">Password: 
      <input v-if="userData.password" type="password" v-model="userData.password" />
      <v-else/>
      </p>
      <v-else/>

    </div>
  </template>

<script lang="ts">
import User from '../model/user'

export default {
    props: {
    userData: {
      type: User,
      required: true
    }
  }
};
</script>