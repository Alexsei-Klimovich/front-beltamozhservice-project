<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <single-file/>
</template>

<script>
import SingleFile from './components/SingleFile.vue';


export default {
  name: 'App',
  components: {
    SingleFile,
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
  max-width: 600px;
  margin: auto;
}
</style>
