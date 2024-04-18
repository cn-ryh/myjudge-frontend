<script setup lang="ts">
import { ip } from '@/ip';
import axios from 'axios';
import { Ref, ref } from 'vue';
import { TabPane, Tabs, Card, Table, TableColumn, Link } from '@arco-design/web-vue';
const id = ref(0);
const src = window.location.href;
id.value = +src.substring(src.lastIndexOf('/') + 1);
const title = ref('');
const description = ref('');
const problems: Ref<unknown[]> = ref([]);
const author = ref('');
const dashboard = ref([]);
axios.get(`${ip}/getContest/${id.value}`).then((res) => {
    title.value = res.data.title;
    description.value = res.data.description;
    problems.value = res.data.problems;
    console.log(problems.value);
    author.value = res.data.author;
    setTimeout(() => {
        document.getElementById('description')!.innerHTML = description.value;
    }, 1000);
});
axios.get(`${ip}/getDashBoard/${id.value}`).then((res) => {
    console.log(res.data);
    dashboard.value = res.data.detail;
});
</script>
<template>
    <div id="main">
        <h1 style="width: 90%;text-align: center;">{{ title }}</h1>
        <Card>
            <Tabs default-active-key="1">
                <TabPane key="1" title="比赛介绍">
                    <div>
                        <span id="description">
                        </span>
                    </div>
                </TabPane>
                <TabPane key="2" title="题目列表">
                    <div>
                        <Table :data="problems" size="medium">
                            <template #columns>
                                <TableColumn title="编号" data-index="pid">
                                </TableColumn>
                                <TableColumn title="题目名称" data-index="title">
                                    <template #cell="{ record }">
                                        <Link :href="`/proble#m/${record.pid}?contestId=${id}`">
                                        <span style="font-weight: 800;">
                                            {{ record.title }}
                                        </span>
                                        </Link>
                                    </template>
                                </TableColumn>
                            </template>
                        </Table>

                    </div>
                </TabPane>
                <TabPane key="3" title="排行榜">
                    <Table :data="dashboard" size="medium">
                        <template #columns>
                            <TableColumn title="用户名" data-index="username">
                            </TableColumn>
                            <TableColumn title="总分" data-index="totPoint">
                            </TableColumn>

                            <TableColumn v-for="(item, id) of problems" :title="item.pid" :key="(id)">
                                <template #cell="{ record }">
                                    {{ record.points[id] ? (record.points[id].point) : "" }}
                                </template>
                            </TableColumn>
                        </template>
                    </Table>
                </TabPane>
            </Tabs>
        </Card>
    </div>
</template>
