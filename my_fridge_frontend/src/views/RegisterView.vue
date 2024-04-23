<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <input v-model="email" type="email" placeholder="Email">
      <input v-model="password" type="password" placeholder="Password">
      <input v-model="password2" type="password" placeholder="Confirm Password">
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import api from '../api';

export default {
  name: 'RegisterView',
  data() {
    return {
      email: '',
      password: '',
      password2: ''
    };
  },
  methods: {
    async register() {
      const data = await api.register(this.email, this.password, this.password2);
      if (data) {
        // Handle success
      }
    }
  }
}
</script>