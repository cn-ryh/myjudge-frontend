<script setup lang="ts">
import { Card } from "@arco-design/web-vue";
import { keepLogin } from "@/modules/user/getUserData";
import { ref } from 'vue';
import axio from "axios";
import * as echarts from 'echarts';
import navView from "@/modules/navView.vue";
import { ip } from "@/ip";
window.onhashchange = () => {
    window.location.reload();
};
const isLogin = ref(false);
const username = ref("");
const uid = ref(0);
keepLogin().then((res) => {
    if (res.logined) {
        isLogin.value = true;
        uid.value = res.uid;
        axio.get(`${ip}/getUsername/${res.uid}`).then((data) => {
            username.value = data.data.username;
        });
    }
});
const date: string[][] = [[], [], [], []];
const data = [[0], [0], [0], [0], [0], [0]];
const cpuChart: echarts.ECharts[] = [];
const ChartIdName = ['cpuUse', 'MemUse', 'vdaUseRead', 'vdaUseWrite'];
// const ChinaTitle = ['CPU 占用', '内存占用', '磁盘读速度', "磁盘写速度"];
const ChinaName = ['CPU 占用 %', '内存占用(MB)', '硬盘写速度(KB/s)', '硬盘读速度(KB/s)'];
function watchData() {
    const now = new Date();
    axio.get(`https://lenovo.cnryh.cn:38888/core/watchServer`).then((res) => {
        data.push(res.data.cpuUse);
        for (let id = 0; id <= 1; id++) {
            if (data[id].length > 50) {
                data[id].shift();
                date[id].shift();
            }

            data[id].push(res.data[ChartIdName[id]]);
            date[id].push([now.getHours(), now.getMinutes(), now.getSeconds()].join(':'));
            const option = {
                tooltip: {
                    trigger: 'axis'
                },
                toolbox: {
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: date[id]
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%']
                },

                series: [
                    {
                        name: `${ChinaName[id]}`,
                        type: 'line',
                        symbol: 'none',
                        sampling: 'lttb',
                        itemStyle: {
                            color: 'rgb(255, 70, 131)'
                        },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: `rgb(${(70 + id * 30).toFixed(0)},${(255 - 40 * id).toFixed(0)} , 131)`
                                },
                                {
                                    offset: 1,
                                    color: `rgb(213, ${(70 + id * 30).toFixed(0)}, 131)`
                                }
                            ])
                        },
                        data: data[id]
                    },
                ]
            };
            cpuChart[id].setOption(option);
        }
    });
}
setTimeout(() => {
    cpuChart.push(echarts.init(document.getElementById(`cpuUse`)));
    cpuChart.push(echarts.init(document.getElementById(`memUse`)));
    setInterval(() => {
        watchData();
    }, 3000);
    watchData();
}, 150);
</script>
<template>
    <navView></navView>
    <div id="page">
        <Card style="position: absolute;width: 30vw;height: 88vh;right:1vw;top:4rem">
            <div id="cpuUse" style="width: 95%;height: 35vh;padding: 0;"></div>
            <div id="memUse" style="width: 95%;height: 35vh;"></div>
        </Card>
    </div>
</template>
<style>
a {
    text-decoration: none;
    color: #262626;
}

.menu {
    width: 90vw;
    height: 3rem;
    background-color: aquamarine;
}

main {
    background-color: rgb(71, 71, 104);
    flex: 1;
}

html body {
    height: 100%;
    margin: 0px !important;
}

.menu-obj {
    height: 4rem;
    width: 95px;
    display: inline-block;
    margin-top: auto;
    padding-top: .65rem;
    font-family: -apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", "Noto Sans", "Noto Sans CJK SC", "Noto Sans CJK", "Source Han Sans", "PingFang SC", "Segoe UI", "Microsoft YaHei", sans-serif;
    font-size: large;

}

.menu-obj .a {
    margin: auto;
}


:deep(.arco-layout-header),
:deep(.arco-layout-footer),
:deep(.arco-layout-sider-children),
:deep(.arco-layout-content) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--color-white);
    font-size: 16px;
    font-stretch: condensed;
    text-align: center;
}
</style>