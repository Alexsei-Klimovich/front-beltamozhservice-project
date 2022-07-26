<template>
  <div id="app">
    <h1>Beltamozhservice project</h1>
  </div>
  <div class="textcols">
    <div class="textcols-item">
      <div id="app">
        <h2>XML(XSD) files</h2>
        <form encType="multipart/form-data">
          <input type="file" name="file" multiple="" v-on:change="fileChange($event.target.files)"/> <br>
          <div class="form_radio_group">
            <div class="form_radio_group-item">
              <input id="radio-1" type="radio" name="radio" value="1" checked>
              <label for="radio-1">В БД</label>
            </div>
            <div class="form_radio_group-item">
              <input id="radio-2" type="radio" name="radio" value="2">
              <label for="radio-2">SQL Scripts</label>
            </div>
          </div>
          <br>
          <button type="button" ref="files" v-on:click="upload()">Upload</button>
        </form>
      </div>
    </div>
    <div class="textcols-item">
      <div id="app">
        <h2>Excel(XLSX) files</h2>
        <form encType="multipart/form-data">
          <input type="file" name="file" multiple="" v-on:change="fileChange($event.target.files)"/> <br>
          <div class="form_radio_group">
            <div class="form_radio_group-item">
              <input id="radio-3" type="radio" name="radio" value="3" checked>
              <label for="radio-3">В БД</label>
            </div>
            <div class="form_radio_group-item">
              <input id="radio-4" type="radio" name="radio" value="4">
              <label for="radio-4">SQL Scripts</label>
            </div>
          </div>
          <br>
          <button type="button" ref="files" v-on:click="upload()">Upload</button>
        </form>
      </div>
    </div>
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
      for (let i = 0; i < fileList.length; i++) {
        this.files.append("file", fileList[i], fileList[i].name);
      }
    },
    upload() {
      axios({method: "POST", "url": "http://localhost:9000/upload", "data": this.files}).then(result => {
        console.dir(result.data);
        this.$refs.files.reset();
      }, error => {
        console.error(error);
      });
    },
    removeFile() {
      this.$refs.files.value = null;
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
  color: #17a2b8;
  margin-top: 10px;
  margin-bottom: 10px;
}
.textcols {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}
.textcols-item {
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
  height: 45%;
  background: #343a40;
  border-radius: 5px;
  margin: 3% 3% 3% 3%;
}
.textcols-item + .textcols-item {

}
.form_radio_group {
  margin-top: 5px;
  display: inline-block;
  overflow: hidden;
}
.form_radio_group-item {
  display: inline-block;
  float: left;
}
.form_radio_group input[type=radio] {
  display: none;
}
.form_radio_group label {
  display: inline-block;
  cursor: pointer;
  padding: 0px 15px;
  line-height: 34px;
  border: 1px solid #999;
  border-right: none;
  user-select: none;
}

.form_radio_group .form_radio_group-item:first-child label {
  border-radius: 6px 0 0 6px;
}
.form_radio_group .form_radio_group-item:last-child label {
  border-radius: 0 6px 6px 0;
  border-right: 1px solid #999;
}

/* Checked */
.form_radio_group input[type=radio]:checked + label {
  background: #28a745;
}

/* Hover */
.form_radio_group label:hover {
  color: #666;
}
</style>