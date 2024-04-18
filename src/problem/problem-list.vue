<script setup lang="ts">
import { Ref, ref } from 'vue';
import { getProblem, Problem } from './getProblems';
import { Table, TableColumn, Tag } from "@arco-design/web-vue";
import { translateColor, translateDiff } from '@/modules/problem/translate';
// window.location.
document.title = `题目列表`;
const problemList: Ref<Problem[]> = ref([]);
getProblem().then((res) => {
    problemList.value = res;
});

</script>
<template>
    <div id="problemList" class="row-warp" style="margin-left: 2vw;">
        <Table :pagination="{ pageSize: 15 }" :data="problemList" size="medium" :bordered="false" style="width: 90vw;">
            <template #columns>
                <TableColumn title="题号" data-index="pid">
                </TableColumn>
                <TableColumn title="题目名称" data-index="title">
                    <template #cell="{ record }">
                        <a :href="`/problem#/${record.pid}`">
                            <span style="font-weight: 800;">
                                {{ record.title }}
                            </span>
                        </a>
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
</template>

<style>
a {
    text-decoration: none;
    color: #3e5fe0;
}

td {
    padding: 5px 0 !important;
}

button {
    background-color: none !important;
    width: auto !important;
    height: auto !important;
}

.progress-frame {
    box-sizing: border-box;
    background: #e8e8e8;
    border: 2px solid #e8e8e8;
    border-radius: 2px;
    height: 1em;
    overflow: hidden;
}
</style>