<script setup>
import { ip } from '@/ip';
import axios from 'axios';
import { ref } from 'vue';
import { Notification, Card, Tabs, TabPane, Link, Button } from '@arco-design/web-vue';
import { AutoComplete, DateRangePicker } from 'tdesign-vue-next'

let title = ref(``)
let description = ref(``)
let page = window.location.href;
let problems = ref([]);
let upproblems = ref([]);
let problemList = ref()
let options = ref([]);
let TimeRange = ref([]);
const nowProblem = ref(``)
axios.get(`${ip}/getProblemList`).then((res) => {
    options.value = [];
    problemList.value = res.data.problems
    for (let now of res.data.problems) {
        options.value.push(`${now.pid} ${now.title}`);
    }
})
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
let id = ref(``);
if (page.substring(page.lastIndexOf(`/`) + 1) !== `contest`) {
    axios.get(`${ip}/getContest/${page.substring(page.lastIndexOf(`/`) + 1)}`).then((res) => {
        let contest = res.data;
        description.value = contest.descriptionmd;
        id.value = contest.id;
        title.value = contest.title
        problems.value = contest.problems;
        for (let i = 0; i < problems.value.length; i++) {
            upproblems.value.push({ id: i, problem: problems.value[i].pid });
        }
        const l = new Date(contest.begintime), r = new Date(contest.endtime)
        TimeRange.value = [`${l.getFullYear()}-${l.getMonth()}-${l.getDate()} ${l.getHours()}:${l.getMinutes()}-${l.getSeconds()}`,
        `${r.getFullYear()}-${r.getMonth()}-${r.getDate()} ${r.getHours()}:${r.getMinutes()}-${r.getSeconds()}`]
    })
}
else {

}
function changeTraining() {
    axios.post(`${ip}/changeContest/${page.substring(page.lastIndexOf(`/`) + 1)}`, {
        title: title.value,
        description: description.value,
        problems: upproblems.value,
        begintime: (new Date(TimeRange.value[0])).getTime() / 1000,
        endtime: (new Date(TimeRange.value[1])).getTime() / 1000,
    }).then(() => {
        Notification.success(`更新成功`)
    })
}

</script>
<template>
    <Card style="width: 90%;margin: 5%;">
        <div>
            <span> 比赛编号 </span>
            <input id="problemIdInputer" v-model="id">
        </div>
        <Tabs default-active-key="1">
            <TabPane key="1" title="描述编辑">
                <h3>比赛名称</h3>
                <div style="width: 40%; height: 32px;display: flex;margin: 0 auto;">
                    <input v-model="title" id="title" style="outline: 0;flex: 1;font-size: large;" />
                </div><br>
                <br>
                比赛描述
                <br>
                <br>
                <textarea v-model="description" class="inputarea"
                    style="margin-bottom: 20px; height: 20rem;width: 95%;resize: none;margin-left: 10px;"
                    placeholder="请输入比赛描述，支持Markdown。"></textarea>

            </TabPane>
            <TabPane key="2" title="题目编辑">
                <div>
                    <span>请选择题目：</span>
                    <AutoComplete v-model="nowProblem" :options="options" :filter="filterWords" highlight-keyword
                        placeholder="请输入题目编号或标题" style="width: 280px;display: inline-block;" />
                    <Button @click="addToTable()">确认</Button>

                    <Table style="margin-top: 20px;" :columns="columns" :data="problems"
                        :draggable="{ type: 'handle', width: 40 }" @change="handleChange">
                        <template #columns style="height: 10px !important">
                            <TableColumn title="题号" data-index="pid">
                            </TableColumn>
                            <TableColumn title="题目名称" data-index="title">
                                <template #cell="{ record }">
                                    <Link :href="`./problem.html#/${record.pid}`">
                                    <span style="font-weight: 800;">
                                        {{ record.title }}
                                    </span>
                                    </Link>
                                </template>
                            </TableColumn>
                            <TableColumn title="题目难度" data-index="difficult">
                                <template #cell="{ record }">
                                    <a-tag :color="translateColor(record.difficult)">
                                        {{ translateDiff(record.difficult) }}
                                    </a-tag>
                                </template>
                            </TableColumn>
                            <!-- </a> -->
                        </template>
                    </Table>
                </div>
            </TabPane>

        </Tabs>
        <DateRangePicker v-model="TimeRange" enable-time-picker allow-input clearable @pick="onPick" @change="onChange" />
        <br>
        <br>
        <Button @click="changeTraining()">
            确认更改
        </Button>
    </Card>
</template>
<style>
#newProblem {
    width: 80%;
    margin: 0 auto;
}
</style>