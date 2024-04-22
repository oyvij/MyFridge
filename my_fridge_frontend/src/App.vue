<template>
  <div>
    <FridgeView />
  </div>
</template>

<script>
import FridgeView from './views/FridgeView.vue'
export default {
  name: 'App',
  components: {
    FridgeView
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
