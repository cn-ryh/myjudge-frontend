
<script setup >
import { ip } from "@/ip";
import { Card,Tag,Link } from "@arco-design/web-vue";
import axios from "axios";
import { ref } from "vue";
let uid = window.location.href.substring(window.location.href.lastIndexOf(`/`) + 1)
let acceptedProblems = ref([])
let triedProblems = ref([])
axios.get(`${ip}/getUserData/${uid}`).then((res)=>
{
    acceptedProblems.value = res.data.acceptedProblems;  
    triedProblems.value = res.data.triedProblems;
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
    <div style="width: 90vw;height: 100vh;">
        <div style="width: 60%;height: 95%;float: left;margin-top: 6vh;">
            <Card style="width: 100%;height: 100%;padding: 5%;font-size: larger;">
                <div v-for="(item,idx) of acceptedProblems" >
                    <div v-if="item.length > 0">
                        <Tag :color="translateColor(idx)" size="large">{{ translateDiff(idx) }}</Tag>
                        <br/>
                        <br/>
                        
                        <div>
                            <span  v-for="(problem) of item">
                                <Link :href="`./problem.html#/${problem}`" style="font-size: large;">
                                    {{ problem }}
                                </Link>
                                {{ ' ' }}
                            </span>
                        </div>
                        <br/>

                    </div>
                </div>
            </Card>
        </div>
        <!-- <div style="position: fixed;width: 25vw;height: 60vh;right: 3vw ;top:8vh; background-color: yellowgreen;float: right;">
        </div> -->
    </div>
</template>
