<script setup>
import { ip } from '@/ip';
import axios from 'axios';
import { ref } from 'vue';
const contests = ref([])
import { Card, Link, Tag } from '@arco-design/web-vue'
axios.get(`${ip}/getContestList`).then((res) => {
    contests.value = res.data;
})
</script>
<template>
    <h1 style="text-align: center;width: 90%;">比赛列表</h1>
    <Card style="margin-top: 3rem;width: 96%;">
        <div class="grid-demo-background" style="text-align: center;">
            <a :href="`./contest.html#/${item.id}`" v-for="(item, index) of contests">
                <Card size="mini" style="width: 30%;display: inline-block;height: 8rem;margin: 3% 2%;" :title="item.title">
                    <template #extra>
                        <Link :href="`./contest.html#/${item.id}`">查看详情</Link>
                    </template>
                    <Tag>{{ item.type }}</Tag>
                    <br>
                    <br>
                    <span>
                        {{ item.begintime.split(`T`)[0] + ` ` + item.begintime.split(`T`)[1].split(`.`)[0] }} ~ {{
                            item.endtime.split(`T`)[0] + ` ` + item.endtime.split(`T`)[1].split(`.`)[0] }}
                    </span>
                </Card>
            </a>

        </div>
    </Card>
</template>

<style>
a {
    text-decoration: none;
}
</style>

