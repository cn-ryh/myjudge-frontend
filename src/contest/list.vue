<script setup>
import { ip } from '@/ip';
import axios from 'axios';
import { ref } from 'vue';
const contests = ref([])
axios.get(`${ip}/getContestList`).then((res) => {
    contests.value = res.data;
})
</script>
<template>
    <h1 style="text-align: center;width: 90%;">比赛列表</h1>
    <a-card style="margin-top: 3rem;width: 96%;">
        <div class="grid-demo-background" style="text-align: center;">
            <a :href="`./contest.html#/${item.id}`" v-for="(item, index) of contests">
                <a-card size="mini" style="width: 30%;display: inline-block;height: 8rem;margin: 3% 2%;" :title="item.title">
                    <template #extra>
                        <a-link :href="`./contest.html#/${item.id}`">查看详情</a-link>
                    </template>
                    <a-tag >{{ item.type }}</a-tag>
                    <br>
                    <br>
                    <span>
                        {{ item.begintime.split(`T`)[0] + ` ` + item.begintime.split(`T`)[1].split(`.`)[0] }} ~ {{ item.endtime.split(`T`)[0] + ` ` + item.endtime.split(`T`)[1].split(`.`)[0] }}
                    </span>
                </a-card>
            </a>

        </div>
    </a-card>
</template>

<style>
a {
    text-decoration: none;
}
</style>

