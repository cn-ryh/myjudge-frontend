
<script setup>
import { ip } from "@/ip";
import axios from "axios";
import { ref } from "vue";
const id = ref(0)
const src = window.location.href;
id.value = src.substring(src.lastIndexOf(`/`) + 1)
const title = ref(``);
const description = ref(``);
const problems = ref([]);
const author = ref(``);
import { Tabs, TabPane, Table, TableColumn, Tag, Link, Card } from '@arco-design/web-vue'
axios.get(`${ip}/getTraining/${id.value}`).then((res) => {
    title.value = res.data.title
    description.value = res.data.description
    problems.value = res.data.problems
    author.value = res.data.author
    document.getElementById(`description`).innerHTML = description.value;
})

// window.location.reload();

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

</script>
<template>
    <div id="main">
        <h1 style="width: 90%;text-align: center;">{{ title }}</h1>
        <Card style="width: 96%;">
            <Tabs default-active-key="1">
                <TabPane key="1" title="题单介绍">
                    <div>
                        <span id="description"></span>
                    </div>
                </TabPane>
                <TabPane key="2" title="题目列表">
                    <div>
                        <Table :data="problems" size="medium">
                            <template #columns style="height: 10px !important">
                                <!-- <a :href="`./problem.html#/${prob.pid}`"> -->
                                <TableColumn title="题号" data-index="pid" :sortable="true"></TableColumn>
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
        </Card>
    </div>
</template>
