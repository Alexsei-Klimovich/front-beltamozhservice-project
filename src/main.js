import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

document.getElementById('excel').style.display = "none";
document.getElementById('show').onclick = function() {
    var f = document.getElementById("files");
    f.value == "" ? alert("Выберите файлы!!!")
        : document.getElementById('excel').style.display = "";
}

var inp = document.getElementById('selected-files').onclick = function () {
    var opt = null;
    var name;

    for (var i = 0; i < inp.files.length; i++) {
        name = inp.files.item(i);
        opt = document.createElement('option');
        opt.value = inp[i].files.id;
        opt.innerHTML = name;
        inp.appendChild(opt);
    }
}
