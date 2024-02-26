<script setup >
import { ip } from "@/ip";
import { Card, Tag, Link, Progress } from "@arco-design/web-vue";
import axios from "axios";
import { ref } from "vue";
let uid = window.location.href.substring(window.location.href.lastIndexOf(`/`) + 1)
let acceptedProblems = ref([])
let triedProblems = ref([])
let payed = ref(0);
let username = ref('');
let level = ref(0);
let exp = ref(0)
window.onhashchange = () => {
    window.location.reload();
}
axios.get(`${ip}/getUserData/${uid}`).then((res) => {
    acceptedProblems.value = res.data.acceptedProblems;
    triedProblems.value = res.data.triedProblems;
    payed.value = res.data.payed;
    username.value = res.data.username;
    level.value = res.data.level;
    exp.value = res.data.exp;
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
let mx = [0,3.394,10.793,21.235,34.322,49.81,67.525,87.337,109.14,132.849,158.39,185.7,214.72,245.41,277.72,311.61,347.05,384.013,422.45]
let levelName = ["预备役","列兵","上等兵","下士","中士","上士","少尉","中尉","上尉","大尉","少校","中校","上校","大校","少将","中将","上将","大将","元帅"]
function getPercent() {
    console.log(exp,mx[level + 1])
    return exp.value / mx[level.value + 1] 
}

</script>

<template>
    <div style="width: 90vw;height: 100vh;">
        <div style="width: 60%;height: 95%;float: left;margin-top: 6vh;">
            <Card style="width: 100%;height: 100%;padding: 5%;font-size: larger;">
                <div v-for="(item, idx) of acceptedProblems">
                    <div v-if="item.length > 0">
                        <Tag :color="translateColor(idx)" size="large">{{ translateDiff(idx) }}</Tag>
                        <br />
                        <br />

                        <div>
                            <span v-for="(problem) of item">
                                <Link :href="`./problem.html#/${problem}`" style="font-size: large;">
                                {{ problem }}
                                </Link>
                                {{ ' ' }}
                            </span>
                        </div>
                        <br />

                    </div>
                </div>
            </Card>
        </div>
        <div style="position: fixed;width: 25vw;height: 70vh;right: 3vw ;top:8vh;float: right;">

            <Card style="width: 100%;height: 90%;">
                <div>
                    <center>
                        <h2>
                            欢迎 <span style="color: black;">{{ username.substring(0, 1) }}</span><span style="color: red;">{{
                                username.substring(1) }}</span>。
                        </h2>
                    </center>
                </div>
                <br />
                <img style="width: 60%;padding-left: 20%;" src="/pay.png" />
                <br />
                <center>
                    <div>
                        <h3>升级进度</h3>
                    </div>
                </center>
                <Progress stroke-width="25" :animation="true" width="22vw" :percent="getPercent().toFixed(4)" :color="{
                    '0%': 'rgb(var(--primary-6))',
                    '100%': 'rgb(var(--success-6))',
                }" size="large">
                </Progress>
                <br/>
                <br/>
                <center>
                    <div style="font-size: large;">
                        <div style="font-size: 16px;">
                            您已为 Online Judge 贡献 <span style="color: red;font-weight: 700;">{{ payed }}</span> 元。
                        </div>
                        <br/>
                        您当前经验值为 <span style="color: red;font-weight: 700;">{{exp.toFixed(2)}}</span>，达成 <span style="color: red;font-weight: 700;">{{ levelName[level] }}</span> 等级。
                    </div>
                </center>
            </Card>
        </div>
    </div>
</template>
