<template>
    <div class="login-container">
        <h1>Login</h1>
        <form @submit.prevent="login">
            <input v-model="email" type="email" placeholder="Email" required>
            <input v-model="password" type="password" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>
        <p>If you don't have an account, <router-link to="/register">register here</router-link>.</p>
    </div>
</template>

<script>
import api from '../api';

export default {
    name: 'LoginView',
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        async login() {
            try {
                const data = await api.login(this.email, this.password);
                if (data && data.accountTokenId) {
                    // Store the token in session storage or another method of your choice
                    sessionStorage.setItem('accountTokenId', data.accountTokenId);
                    this.$router.push('/'); // Redirect to the home page
                } else {
                    // Handle errors or invalid login attempts
                    alert('Login failed. Please check your credentials.');
                }
            } catch (error) {
                console.error('Login error:', error);
                alert('An error occurred. Please try again later.');
            }
        }
    }
}
</script>

<style scoped>
.login-container {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 5px;
}

input[type="email"],
input[type="password"] {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    box-sizing: border-box;
    display: block;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #2c3e50;
    color: white;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #3e5160;
}

router-link {
    color: #2c3e50;
    text-decoration: none;
}

router-link:hover {
    text-decoration: underline;
}
</style>