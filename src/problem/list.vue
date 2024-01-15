<script aysnc setup>
import { ref } from 'vue';
import { getProblem } from './getProblems';
import { Table, TableColumn, Tag } from "@arco-design/web-vue"
// window.location.
document.title = `题目列表`
let problemList = ref([]);
let a = getProblem().then((res) => {
    problemList.value = res;
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
</script>
<template>
    <div id="problemList" class="row-warp">
        <Table :pagination="{ pageSize: 15 }" :data="problemList" size="medium" :bordered="false" style="width: 90vw;">
            <template #columns style="height: 10px !important">
                <!-- <a :href="`./problem.html#/${prob.pid}`"> -->
                <TableColumn title="题号" data-index="pid">
                </TableColumn>
                <TableColumn title="题目名称" data-index="title">
                    <template #cell="{ record }">
                        <a :href="`./problem.html#/${record.pid}`">
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