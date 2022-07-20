<template>
  <div class="container" id="app">
    <div class="large-12 medium-12 small-12 cell">
      <h1>Upload a File</h1>
      <h2>Chose "XML" and "XLSX"/"XLS" files</h2>
      <label>Files
        <input type="file" name="file" id="files" ref="files" multiple v-on:change="handleFilesUpload()"/>
      </label>
      <button v-on:click="submitFiles()">Upload</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: 'app',
  data(){
    return {
      files: ''
    }
  },
  methods: {
    submitFiles(){
      let formData = new FormData();
      for( var i = 0; i < this.files.length; i++ ){
        let file = this.files[i];
        formData.append('files[' + i + ']', file);
      }
      axios.post( '/multiple-files',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
      ).then(function(){
        console.log('SUCCESS!!');
      })
          .catch(function(){
            console.log('FAILURE!!');
          });
    },
    handleFilesUpload(){
      axios({ method: "POST", "url": "http://localhost:9000/upload", "data": this.$refs.files.files }).then(result => {
        console.dir(result.data);
      }, error => {
        console.error(error);
      });
      // this.files = this.$refs.files.files;
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