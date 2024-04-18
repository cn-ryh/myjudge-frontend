<script setup lang="ts">
import { ip } from '@/ip';
import axios from 'axios';
import { Ref, ref } from 'vue';
import { Notification, Button, TabPane, Tabs, Table, TableColumn, Tag, Link } from '@arco-design/web-vue';
import { AutoComplete, AutoCompleteOption, AutoCompleteOptionObj, DateRangePicker } from 'tdesign-vue-next';

const title = ref(``);
const description = ref(``);
document.title = `新建比赛`;
const problems: Ref<IProblem[]> = ref([]);
const upproblems: Ref<unknown[]> = ref([]);
function filterWords(keyword: string, option: AutoCompleteOption) {
    const regExp = new RegExp(keyword);
    return regExp.test((option as AutoCompleteOptionObj).text!);
}
const options: Ref<AutoCompleteOption[]> = ref([]);
const nowProblem = ref(``);
const problemList: Ref<IProblem[]> = ref([]);
axios.get(`${ip}/getProblemList`).then((res) => {
    options.value = [];
    problemList.value = res.data.problems;
    for (const now of res.data.problems) {
        options.value.push(`${now.pid} ${now.title}`);
    }
});
const TimeRange = ref([]);

function newContest() {
    if (TimeRange.value.length !== 2) {
        Notification.error(`请填写完整时间`);
        return;
    }

    if (title.value === ``) {
        Notification.error(`请填写完整比赛标题`);
        return;
    }
    axios.post(`${ip}/newContest`, {
        title: title.value,
        description: description.value,
        problems: upproblems.value,
        begintime: new Date(TimeRange.value[0]).getTime(),
        endtime: new Date(TimeRange.value[1]).getTime(),
        author: "cn_ryh",
        type: `OI`
    }).then((res) => {
        if (res.data.success == true) {
            Notification.success({
                title: "成功",
                content: `比赛创建成功`
            });
        }

    });
}
function addToTable() {
    if (nowProblem.value !== ``) {

        const id = nowProblem.value.split(` `)[0];
        if (!id) {
            Notification.error({ title: `题目未找到`, content: `您选择的题目 ${nowProblem.value} 未扎到` });
            return;
        }
        const x = problemList.value.filter((item) => {
            return item.pid == id;
        })[0];
        if (!x) {
            Notification.error({ title: `题目未找到`, content: `您选择的题目 ${nowProblem.value} 未扎到` });
            return;
        }
        upproblems.value.push({
            id: problems.value.length + 1,
            problem: x.pid
        });
        problems.value.push(x);
        nowProblem.value = ``;
    }
    else {
        return;
    }
}


</script>
<template>
    <Card>

        <Tabs>
            <TabPane key="1" title="比赛信息">
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
                <DateRangePicker v-model="TimeRange" enable-time-picker allow-input clearable />

            </TabPane>
            <TabPane key="2" title="题目编排">
                <div>
                    <span>请选择题目：</span>
                    <AutoComplete v-model="nowProblem" :options="options" :filter="filterWords" highlight-keyword
                        placeholder="请输入题目编号或标题" style="width: 280px;display: inline-block;" />
                    <Button @click="addToTable()">确认</Button>

                    <Table style="margin-top: 20px;" :data="problems" :draggable="{ type: 'handle', width: 40 }"
                        @change="handleChange">
                        <template #columns>
                            <TableColumn title="题号" data-index="pid">
                            </TableColumn>
                            <TableColumn title="题目名称" data-index="title">
                                <template #cell="{ record }">
                                    <Link :href="`/problem#/${record.pid}`">
                                    <span style="font-weight: 800;">
                                        {{ record.title }}
                                    </span>
                                    </Link>
                                </template>
                            </TableColumn>
                            <TableColumn title="题目难度" data-index="difficult">
                                <template #cell="{ record }">
                                    <Tag :color="translateColor(record.difficult)">
                                        {{ translateDiff(record.difficult) }}
                                    </Tag>
                                </template>
                            </TableColumn>
                            <!-- </a> -->
                        </template>
                    </Table>
                </div>
            </TabPane>
        </Tabs>

        <br>
        <button @click="newContest"> 确认新建 </button>
    </Card>
</template>