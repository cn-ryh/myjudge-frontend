<script setup lang="ts">
import { ip } from '@/ip';
import axios from 'axios';
import { Ref, ref } from 'vue';
import { Notification, TabPane, Tabs } from '@arco-design/web-vue';
import { DateRangePicker } from 'tdesign-vue-next';
import ProblemSelecter from '@/modules/problem/problemSelecter.vue';

const title = ref(``);
const description = ref(``);
document.title = `新建比赛`;
const upproblems: Ref<IProblem[]> = ref([]);
const TimeRange: Ref<number[]> = ref([]);
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
                <ProblemSelecter v-model:upproblems="upproblems"></ProblemSelecter>
            </TabPane>
        </Tabs>
        <br>
        <button @click="newContest"> 确认新建 </button>
    </Card>
</template>