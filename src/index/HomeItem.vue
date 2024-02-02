<script setup>
import navView from "../nav.vue"
import { Calendar } from 'tdesign-vue-next'
import { Link, Card } from "@arco-design/web-vue"
import { keepLogin } from "@/keepLogin";
import { ref } from 'vue'
import axio from "axios";
import * as echarts from 'echarts'

import { ip } from "@/ip";
window.onhashchange = () => {
    window.location.reload();
}
let isLogin = ref(false)
let username = ref("")
let uid = ref(0);
keepLogin().then((res) => {
    if (res.logined) {
        isLogin.value = true;
        uid.value = res.uid;
        axio.get(`${ip}/getUsername/${res.uid}`).then((data) => {
            username.value = data.data.username;
        })
    }
})


let base = +new Date(1968, 9, 3);
let oneDay = 24 * 3600 * 1000;
let date = [[], [], [], []];
let data = [[0], [0], [0], [0],[0],[0]];
var cpuChart = []
let ChartIdName = ['cpuUse', 'MemUse', 'vdaUseWrite', 'vdbUseWrite','vdaUseRead', 'vdbUseRead']
let ChinaTitle = ['CPU 占用', '内存占用', '系统盘读写', '数据盘读写']
let ChinaName = ['CPU 占用 %', '内存占用(MB)', '系统盘写速度(KB/s)', '数据盘写速度(KB/s)','系统盘读速度(KB/s)', '数据盘读速度(KB/s)']
function watchData() {
    var now = new Date();
    axio.get(`https://server.cnryh.cn/core/watchServer`).then((res) => {
        data.push(res.data.cpuUse);
        for (var id = 0; id < 4; id++) {
            if (data[id].length > 50) {
                data[id].shift();
                date[id].shift();
                if(id >= 2)
                {
                    data[id + 2].shift();
                }
            }
            
            data[id].push(res.data[ChartIdName[id]])
            if(id >= 2)
            {
                data[id + 2].push(res.data[ChartIdName[id + 2]])
            }
            date[id].push([now.getHours(), now.getMinutes(), now.getSeconds()].join(':'));
            let option = {
                tooltip: {
                    trigger: 'axis',
                    position: function (pt) {
                        return [pt[0], '10%'];
                    }
                },
                title: {
                    left: 'center',
                    text: `${ChinaTitle[id]}`
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
                    }, (id >= 2 ? {
                        name: `${ChinaName[id + 2]}`,
                        type: 'line',
                        symbol: 'none',
                        sampling: 'lttb',
                        itemStyle: {
                            color: 'rgb(115, 210, 131)'
                        },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: `rgb(29,148,247)`
                                },
                                {
                                    offset: 1,
                                    color: `rgb(11,8,200)`
                                }
                            ])
                        },
                        data: data[id + 2]
                    } : null)
                ]
            };
            cpuChart[id].setOption(option)
        }
    })
}
setTimeout(() => {
    cpuChart.push(echarts.init(document.getElementById(`cpuUse`)))
    cpuChart.push(echarts.init(document.getElementById(`memUse`)))
    cpuChart.push(echarts.init(document.getElementById(`vdaUse`)))
    cpuChart.push(echarts.init(document.getElementById(`vdbUse`)))
    setInterval(() => {
        watchData();
    }, 5000)
    watchData();
    setTimeout(() => {
        watchData();
    }, 500);
}, 200)
let bill = ref(17.20),showMessage = ref(true)
function getBill()
{
    axio.get(`https://server.cnryh.cn/core/getBill`).then((res)=>
    {
        bill.value =  +res.data.bill
        showMessage.value = bill.value <= 5?true:false
    })
}
getBill();
</script>
<template>
    <navView></navView>
    <div id="page" style="margin-left: 4rem;">
        <div class="header" id="header" style="background-color: aquamarine;">
            <div class="menu" style="margin-left: 3vw;">
                <div class="menu-obj">
                    <a href="./problem.html#/list">题目列表</a>
                </div>
                <div class="menu-obj">
                    <a href="./files.html"> 文件系统 </a>
                </div>
                <div class="menu-obj" style="position: absolute;right: 2%;top: 0;padding-top: .5rem;">
                    <div v-show="!isLogin">
                        <Link style="font-size: large;" href="./register.html"> 注册 </Link>
                        <Link style="font-size: large;" href="./login.html"> 登录 </Link>
                    </div>
                    <div v-show="isLogin" style="color:red;">
                        <Link :href="`./user.html#/${uid}`"
                            style="color: red !important;font-weight: 700 !important;font-size: larger;">{{ username }}
                        </Link>
                    </div>
                </div>
            </div>
        </div>

        <Card hoverable style="width: 20%;height: 18rem; position: absolute;right: 1rem;top: 4rem;">
            <center>
                <h2>腾讯云可用余额</h2>
                <br/>
                <div>
                    <span style="font-size: 3.5rem;font-weight: 900;color: red;">
                        {{ bill.toFixed(2) }}
                    </span>
                    <span style="font-size: 0.8rem;">元</span>
                </div>
                <br>
                <span v-if="showMessage" style="color: red;font-size: large;font-weight: 700;">
                    余额较低，请及时充值。
                </span>
            </center>
        </Card>
        <Card style="position: absolute;width: 70%;height: 40rem;left: 7em;top:4rem">
            <div style="widows: 90%;height: 35vh;">
                <div id="cpuUse" style="width: 45%;height: 100%;float: left;"></div>
                <div id="memUse" style="width: 45%;height: 100%;float: right;"></div>
            </div>
            <div style="widows: 90%;height: 35vh;">
                <div id="vdaUse" style="width: 45%;height: 100%;float: left;"></div>
                <div id="vdbUse" style="width: 45%;height: 100%;float: right;"></div>
            </div>
        </Card>
    </div>
</template>
<style>
a {
    text-decoration: none;
    color: #262626;
}

.menu {
    width: 100%;
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