<script setup>

import { ip } from '@/ip';
import axios from 'axios';
import { ref } from 'vue';
const trainings = ref([])
axios.get(`${ip}/getTrainingList`).then((res) => {
    trainings.value = res.data;
})
</script>
<template>
    <h1 style="text-align: center;width: 90%;">题单列表</h1>
    <div style="margin-top: 3rem;margin-left: 10%;">
        <a-list style="width: 80%;" :data="trainings" :pagination-props="{
            total: trainings.length,
            pageSize: 10,
        }" :split="true">
            <template #item="{ item, index }">
                <div style="margin: 10px;border-bottom-style: outset;border-bottom-width: 2px;">
                    <a :href="`./training.html#/${item.id}`">
                        <a-list-item :key="index">
                            <a-list-item-meta :title="item.title" :description="item.title + `题单`">
                                <template #avatar>
                                    <a-avatar shape="square" style="background-color: aqua;">
                                        {{ index + 1 }}
                                    </a-avatar>
                                </template>
                            </a-list-item-meta>
                        </a-list-item>
                    </a>
                </div>

            </template>
        </a-list>
    </div>
</template>

<style>
a {
    text-decoration: none;
}
</style>

