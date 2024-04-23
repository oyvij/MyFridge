<template>
    <div>
        <h1>My Account</h1>
        <div>
            <h2>Welcome, {{ accountEmail }}</h2>
            <button @click="fetchHomes">View My Homes</button>
            <div v-if="homes.length">
                <h3>Registered Homes:</h3>
                <ul>
                    <li v-for="home in homes" :key="home.id">{{ home.nanoId }}</li>
                </ul>
            </div>
            <button @click="logout">Logout</button>
        </div>
    </div>
</template>

<script>
import { useStore } from '../store';
import api from '../api';

export default {
    name: 'MyAccountView',
    data() {
        return {
            homes: [],
            accountEmail: '' // Placeholder for actual account email
        };
    },
    methods: {
        async fetchHomes() {
            try {
                const data = await api.getHomesForAccount();
                if (data && data.home) {
                    this.homes = [data.home]; // Adjust this according to actual API response structure
                }
            } catch (error) {
                console.error('Failed to fetch homes:', error);
                // Handle errors, potentially with a notification or message to the user
            }
        },
        logout() {
            // Clear session storage or tokens
            sessionStorage.clear();
            this.$router.push('/login'); // Redirect to login page after logout
        }
    },
    mounted() {
        // Optionally initialize data on component mount
        this.accountEmail = sessionStorage.getItem('accountEmail'); // Assume the email is stored in session storage
    }
}
</script>

<style scoped>
/* Add your styles here */
</style>