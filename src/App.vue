<template>
  <div id="app">
    <h1>Upload a File</h1>
    <form encType="multipart/form-data">
      <input  type="file"  multiple="">
      <input type="file" name="file" multiple="" v-on:change="fileChange($event.target.files)"/>
      <button type="button" v-on:click="upload()">Upload</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'app',
  data() {
    return {
      files: new FormData()
    }
  },
  methods: {
    fileChange(fileList) {
      for (let i = 0; i < 10; i++) {
        this.files.append("file", fileList[i], fileList[i].name);
      }
    },
    upload() {
      axios({method: "POST", "url": "http://localhost:9000/upload", "data": this.files}).then(result => {
        console.dir(result.data);
      }, error => {
        console.error(error);
      });
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>