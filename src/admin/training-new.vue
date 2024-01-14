<script setup>
import { ip } from '@/ip';
import axios from 'axios';
import { ref } from 'vue';
import { Notification, Button } from '@arco-design/web-vue';
import { AutoComplete } from 'tdesign-vue-next'

let title = ref(``)
let description = ref(``)
window.location.title = `新建题单`
let problems = ref([])
let upproblems = ref([])
function filterWords(keyword, option) {
    const regExp = new RegExp(keyword);
    return regExp.test(option.text);
}
const options = ref([])
const nowProblem = ref(``)
const problemList = ref([])
axios.get(`${ip}/getProblemList`).then((res) => {
    options.value = [];
    problemList.value = res.data.problems
    for (let now of res.data.problems) {
        options.value.push(`${now.pid} ${now.title}`);
    }
})
function newTraining() {
    axios.post(`${ip}/newTraining`, {
        title: title.value,
        description: description.value,
        problems: upproblems.value,
        author: "cn_ryh"
    }).then((res) => {
        if (res.data.success == true) {
            Notification.success({
                title: "成功",
                content: `题单创建成功`
            })
        }

    })
}
function addToTable() {
    if (nowProblem.value !== ``) {

        const id = nowProblem.value.split(` `)[0];
        if (!id) {
            Notification.error({ title: `题目未找到`, content: `您选择的题目 ${nowProblem.value} 未扎到` })
            return;
        }
        let x = problemList.value.filter((item) => {
            return item.pid == id;
        })[0];
        if (!x) {
            Notification.error({ title: `题目未找到`, content: `您选择的题目 ${nowProblem.value} 未扎到` })
            return;
        }
        upproblems.value.push({
            id: problems.value.length + 1,
            problem: x.pid
        });
        problems.value.push(x);
        nowProblem.value = ``
    }
    else {
        return;
    }
}
function translateDiff(difficult) {
    switch (difficult) {
        case 1:
            return "普及 T1";
        case 2:
            return "普及 T2";
        case 3:
            return "普及 T3";
        case 4:
            return "普及 T4 / 提高 T1";
        case 5:
            return "提高 T2";
        case 6:
            return "提高 T3 / T4";
        case 7:
            return "省选";
        case 8:
            return "NOI";
        case 9:
            return "NOI+";
        default:
            return "暂无评定";
    }
}

function translateColor(difficult) {
    switch (difficult) {
        case 1:
            return "#f53f3f";
        case 2:
            return "#ff7d00";
        case 3:
            return "#ffb400";
        case 4:
            return "#00b42a";
        case 5:
            return "#165dff";
        case 6:
            return "#0fc6c2";
        case 7:
            return "#b71de8";
        case 8:
            return "black";
        case 9:
            return "#FF00FF";
        default:
            return "#86909c";
    }
}
const handleChange = (_data) => {
    problems.value = _data
}
</script>
<template>
    <Card>
        <h3>题单名称</h3>
        <div style="width: 40%; height: 32px;display: flex;margin: 0 auto;">
            <input v-model="title" id="title" style="outline: 0;flex: 1;font-size: large;" />
        </div><br>
        <br>
        题单描述
        <br>
        <br>
        <textarea v-model="description" class="inputarea"
            style="margin-bottom: 20px; height: 20rem;width: 95%;resize: none;margin-left: 10px;"
            placeholder="请输入题单描述，支持Markdown。"></textarea>
        <div>
            <span>请选择题目：</span>
            <AutoComplete v-model="nowProblem" :options="options" :filter="filterWords" highlight-keyword
                placeholder="请输入题目编号或标题" style="width: 280px;display: inline-block;" />
            <Button @click="addToTable()">确认</Button>

            <a-table style="margin-top: 20px;" :columns="columns" :data="problems"
                :draggable="{ type: 'handle', width: 40 }" @change="handleChange">
                <template #columns style="height: 10px !important">
                    <a-table-column title="题号" data-index="pid">
                    </a-table-column>
                    <a-table-column title="题目名称" data-index="title">
                        <template #cell="{ record }">
                            <Link :href="`./problem.html#/${record.pid}`">
                                <span style="font-weight: 800;">
                                    {{ record.title }}
                                </span>
                            </Link>
                        </template>
                    </a-table-column>
                    <a-table-column title="题目难度" data-index="difficult">
                        <template #cell="{ record }">
                            <a-tag :color="translateColor(record.difficult)">
                                {{ translateDiff(record.difficult) }}
                            </a-tag>
                        </template>
                    </a-table-column>
                    <!-- </a> -->
                </template>
            </a-table>

        </div>
        <br>
        <button @click="newTraining"> 确认新建 </button>
    </Card>
</template>