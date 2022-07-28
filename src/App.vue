<template>
  <div class="parent">
    <img class="block" src="https://declarant.by/local/templates/new-main/components/bitrix/news.list/brandbook/image/logo_gor_end3.svg" alt="">
  </div>
  <div class="textcols">
    <div class="textcols-item">
      <div id="app">
        <h2>XML(XSD) files</h2>
        <form encType="multipart/form-data">
          <input type="file" name="file" multiple="" id="files" accept=".xml,.xsd,.xsd.xml" v-on:change="fileChange($event.target.files)"/> <br>
          <div class="form_radio_group">
            <br>
            <div class="form_radio_group-item">
              <input id="radio-1" type="radio" name="radio" value="data-base-xml" checked>
              <label for="radio-1">В БД</label>
            </div>
            <div class="form_radio_group-item">
              <input id="radio-2" type="radio" name="radio" value="sql-scripts-xml">
              <label for="radio-2">SQL Scripts</label>
            </div>
          </div>
          <br>
          <button type="button" ref="files" id="show" v-on:click="upload()">Upload</button>
        </form>
      </div>
    </div>
    <div class="textcols-item" id="exce"> <!-- ADD L TO ID FOR HIDE DIV -->
      <div id="app">
        <h2>Excel(XLSX) files</h2>
        <form encType="multipart/form-data">
          <input type="file" name="file" id="selected-files" multiple="" accept=".xlsx,.xls" v-on:change="fileChange($event.target.files)"/> <br>
          <div>
            <select id="choice-selected-files">
              <option v-for="item in items" :key="item.download()">
                {{item.download()}}
              </option>
            </select>
          </div>
          <div class="form_radio_group">
            <div class="form_radio_group-item">
              <input id="radio-3" type="radio" name="radio" value="data-base-xlsx" checked>
              <label for="radio-3">В БД</label>
            </div>
            <div class="form_radio_group-item">
              <input id="radio-4" type="radio" name="radio" value="sql-scripts-xlsx">
              <label for="radio-4">SQL Scripts</label>
            </div>
          </div>
          <br>
          <button type="button" ref="files" v-on:click="upload()">Upload</button>
        </form>
      </div>
    </div>
  </div>
  <div>
    <table>
      <tr>
        <th>id</th>
        <th>toStrdocId</th>
        <th>nodeName</th>
        <th>nodePath</th>
        <th>parentName</th>
        <th>parentPath</th>
        <th>pattern</th>
        <th>patternId</th>
      </tr>
      <tr v-for="tab in table" :key="tab">
        <td>{{ tab.id }}</td>
        <td>{{ tab.toStrdocId }}</td>
        <td>{{ tab.nodeName }}</td>
        <td>{{ tab.nodePath }}</td>
        <td>{{ tab.parentName }}</td>
        <td>{{ tab.parentPath }}</td>
        <td>{{ tab.pattern }}</td>
        <td>{{ tab.patternId }}</td>
      </tr>
    </table>
  </div>
</template>



<script>
import axios from "axios";

export default {

  name: 'app',
  data() {
    return {
      table: {},
      files: new FormData()
    }
  },
  methods: {
    fileChange(fileList) {
      for (let i = 0; i < fileList.length; i++) {
        this.files.append("file", fileList[i], fileList[i].name);
      }
    },
    getAllTags() {
      axios.get('http://localhost:9000/getAllTags').
      then(({data}) => (this.table = data))
    },
    download() {
      axios({method: "GET", "url": "http://localhost:9000/getFilesNames", "data": this.files}).then(result => {
        console.dir(result.data);
        // this.$refs.files.reset();
        return result.data;
      }, error => {
        console.error(error);
      });
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
table {
  border: #2d2d2d;
  border-width: 2px;
  width: 80%;
  text-align: left;
}
select {
  border-radius: 3px;
}
.block {
  width: 60%;
  max-width: 25%;
  height: auto;
  max-height: 70%;
  display: inline-block;
  white-space: normal;
  vertical-align: middle;
  text-align: left;
  border-radius: 5px;
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
  background: #2d2d2d;
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

.form_radio_group input[type=radio]:checked + label {
  background: #fff;
}

.form_radio_group label:hover {
  color: #666;
}
</style>