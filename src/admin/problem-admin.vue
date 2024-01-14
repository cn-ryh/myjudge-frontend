<script setup>
import { ip } from '@/ip';
import axios from 'axios';
import { ref } from 'vue';
import { Notification, Button,Upload,Card,TabPane,Tabs } from '@arco-design/web-vue';

let title = ref(``)
let description = ref(``)
let diff = ref(0)
let page = window.location.href;
let pid = ref(``);
if (page.substring(page.lastIndexOf(`/`) + 1) !== `problem`) {
    axios.get(`${ip}/getProblem/${page.substring(page.lastIndexOf(`/`) + 1)}`).then((res) => {
        let problem = res.data;
        description.value = problem.descriptionmd;
        pid.value = problem.pid;
        title.value = problem.title
        diff.value = problem.difficult
    })
}
else {

}
function changeProblem() {
    axios.post(`${ip}/changeProblem/${page.substring(page.lastIndexOf(`/`) + 1)}`, {
        title: title.value,
        description: description.value,
        difficult: diff.value
    }).then(() => {
        Notification.success(`更新成功`)
    })
}

function uploadData() {
    const dataofUser /** {file }*/ = document.getElementById(`DataUploader`).files[0];
    if (!dataofUser) {
        window.alert(`请选择文件`)
        return;
    }
    if (!(/.zip$/.test(dataofUser.name))) {
        window.alert(`仅支持 .zip 格式文件`)
        return;
    }
    const reader = new FileReader();
    const problemId = document.getElementById(`problemIdInputer`).value
    reader.readAsArrayBuffer(dataofUser)
    let p;
    reader.onload = (e) => {
        p = e.target.result
        finish();
    }
    function finish() {
        // 获取blob数据
        let blob = new Blob([p], { type: 'application/octet-stream' });

        // 创建FormData对象
        let formData = new FormData();

        formData.append('file', blob, `${problemId}.zip`); // 第一个参数是后台接收的文件参数名，第二个参数是blob数据，第三个参数是文件名
        // 发送ajax请求
        axios.post(`${ip}/uploadData`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            if (res.data.successUpload) {
                window.alert(`${res.data.successUpload}`)
            }
            else {
                window.alert(`上传失败`)
            }
        })
    }
}
</script>
<template>
    <Card style="width: 90%;margin-left: 5%;margin-top: 1%;">
        <div>
            <span> 题目编号 </span>
            <input id="problemIdInputer" v-model="pid">
        </div>
        <Tabs default-active-key="1">
            
            <TabPane key="1" title="管理">

                <div style="width: 40%; height: 32px;display: flex;">
                    <span>题目名称：</span>
                    <input v-model="title" id="title" style="outline: 0;flex: 1;font-size: large;" />
                </div><br>
                <br>
                <div>
                    <span>题目描述</span>
                    <br>
                    <textarea v-model="description" class="inputarea"
                        style="height: 30rem;width: 95%;resize: none;margin-left: 10px;"
                        placeholder="请输入题目描述，支持Markdown。"></textarea>
                </div>

                <br>
                <div>
                    <span>题目难度</span>
                    <a-select v-model="diff" style="width:280px;margin-left: 2%;" placeholder="请选择题目难度">
                        <a-option :value="1">普及 T1</a-option>
                        <a-option :value="2">普及 T2</a-option>
                        <a-option :value="3">普及 T3</a-option>
                        <a-option :value="4">普及 T4 / 提高 T1</a-option>
                        <a-option :value="5">提高 T2</a-option>
                        <a-option :value="6">提高 T3</a-option>
                        <a-option :value="7">提高 T4</a-option>
                        <a-option :value="8">省选</a-option>
                        <a-option :value="9">NOI</a-option>
                        <a-option :value="10">NOI+</a-option>
                        <a-option :value="0">暂无评定</a-option>
                    </a-select>
                    <Button @click="changeProblem" type="primary">
                        提交
                    </Button>
                </div>
            </TabPane>
            <TabPane key="2" title="数据上传">
                <span>
                    <p>数据上传</p>

                    <Upload draggable :action="`${ip}/uploadData`" :name="pid" @success="(res)=>{console.log(res.response.successUpload)}"/>
                </span>
            </TabPane>
        </Tabs>
    </Card>
</template>
<style>
#newProblem {
    width: 80%;
    margin: 0 auto;
}
</style>