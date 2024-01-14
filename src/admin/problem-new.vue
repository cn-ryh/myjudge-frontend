<script setup>
import { ip } from '@/ip';
import axios from 'axios';
import { ref } from 'vue';
import { Notification, Button } from '@arco-design/web-vue';
window.location.title = `新建题目`
let title = ref(``)
let description = ref(``)
function newProblem() {
    axios.post(`${ip}/newProblem`, {
        title: title.value,
        description: description.value,
        author: "cn_ryh"
    }).then((res) => {
        if (res.data.success == true) {
            Notification.success({
                title: "成功",
                content: `题目创建成功，pid为 ${res.data.pid}`
            })
        }

    })
}
</script>
<template>
    <Card>
        <div style="width: 40%; height: 32px;display: flex;margin: 0 auto;">
            <span style="margin-right: 20px;"><strong>题目名称</strong></span>
            <input v-model="title" id="title" style="outline: 0;flex: 1;font-size: large;" />
        </div><br>
        <br>
        题目描述
        <br>
        <br>
        <textarea v-model="description" class="inputarea" style="height: 32rem;width: 95%;resize: none;margin-left: 10px;"
            placeholder="请输入题目描述，支持Markdown。"></textarea>
        <p>
            题目编号将会自动分配，稍后请在“题目管理”中上传对应题目的测试数据。
        </p>
        <button @click="newProblem"> 确认新建 </button>
    </Card>
</template>