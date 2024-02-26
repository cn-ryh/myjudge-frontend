<script setup>
import { ip } from '@/ip';
import { keepLogin } from '@/keepLogin';
import axios from 'axios';
import { ref } from 'vue';
import navView from '@/nav.vue';
import { Upload, Button } from '@arco-design/web-vue'

window.onhashchange = () => {
    window.location.reload();
}
keepLogin().then((res) => {
    if (!res) {
        window.alert(`请先登录`)
        window.location.href = `./login.html`;
    }
})
let FileLists = ref([])
function getFileList() {
    axios.get(`${ip}/getFileList`, {}).then(res => {
        FileLists.value = res.data
    })
}
function DownloadFile(event) {
    const now = event.target.id.split(`download`)[1]
    let filename = null
    for (let file of FileLists.value) {

        if (file.id == now) {
            filename = file.filename
        }
    }
    axios({
        type: "GET",
        url: `${ip}/downloadFile/${now}`,
        // responseType: "stream",
        responseType: "blob",
    }).then((res) => {
        const blob = res.data;
        let url = URL.createObjectURL(blob);
        let link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    })
}
</script>
<template>
    <navView></navView>
    <div id="Files" style="margin-left: 5rem;">
        <center>
            <h1>欢迎使用 11OJ 在线文件系统</h1>
        </center>
        <div id="FilesUpload">
            <span>
                <Upload multiple :action="`${ip}/uploadFiles`" id="FileUploader" draggable style="width: 80%;height: 20%;margin-left: 10%;">
                </Upload>
            </span>
        </div>
        <div id="FileDownload">
            <center>
                <button @click="getFileList()"
                    style="height: 3rem;font-size: large;margin: 2px;background-color: rgba(210, 130, 10, 10);"> 获取文件列表
                </button>
                <br>
                <br>
                <table id="FileList">
                    <thead>
                        <tr>
                            <td>序号</td>
                            <td>文件名</td>
                            <td>上传时间</td>
                            <td>大小</td>
                            <td>下载次数</td>
                            <td> 下载链接 </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, idx) in FileLists">
                            <td>{{ idx + 1 }}</td>
                            <td>{{ item.filename }}</td>
                            <td>{{ item.uploadtime }}</td>
                            <td>{{ item.filesize }}</td>
                            <td> {{ item.downloadtime }}</td>
                            <td>
                                <button :id="`download` + item.id.toString()" @click="$event => DownloadFile($event)">
                                    下载文件
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </center>
        </div>
    </div>
</template>
<style>
/* button
{
    background-color: chartreuse;
} */
table,
thead,
td {
    border: 1px solid;
    text-align: center;
}

tr,
td {
    padding: 15px;
}

thead {
    background-color: rgba(19, 243, 232, 0.732);
}

table {
    border-collapse: collapse;
}

th {
    height: 70px;
    text-align: left;
}

body {
    margin: 0% !important;
}
</style>