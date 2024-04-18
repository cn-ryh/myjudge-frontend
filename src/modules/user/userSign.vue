<script lang="ts" setup>
import { Tag } from '@arco-design/web-vue'
import '@arco-design/web-vue/es/tag/style/index'
import { getUserData } from '@/modules/user/getUserData';
import { Ref, ref } from 'vue';
const props = defineProps<{
    uid: number,
    showTag?: boolean
}>();
const username = ref(``);
const tagOpt: Ref<{ color: string, text: string }> = ref({ color: '', text: '' });
getUserData(props.uid).then((res) => {
    tagOpt.value = res.tag;
    username.value = res.username;
    console.log(username);
})
</script>
<template>
    <div>
        <span style="color: white;font-size: large;font-weight: 600;margin-right: 10px;">{{ username }}</span>
        <Tag :color="tagOpt.color" v-if="$props.showTag == true && tagOpt.text.length != 0">{{ tagOpt.text }}</Tag>
    </div>
</template>
