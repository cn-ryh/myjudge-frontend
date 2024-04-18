<script setup lang="ts">
import { keepLogin } from '@/modules/user/getUserData';
import { Button, HeadMenu, MenuItem, Image, Link } from 'tdesign-vue-next'
import 'tdesign-vue-next/es/style/css';
import userSign from './user/userSign.vue';
import { Ref, ref } from 'vue';
import { SubMenu } from '@arco-design/web-vue';
const logined: Ref<boolean> = ref(false), uid: Ref<number> = ref(0);
keepLogin().then((res) => {
    if (res.logined) {
        logined.value = true;
        uid.value = res.uid;
    }
})
</script>
<template>
    <HeadMenu theme="dark" style="position: fixed;top: 0;z-index: 9999;">
        <MenuItem value="item1" style="width: 6vh;height: 6vh;" :href="`/`">
        <Image src="/logo.png" style="width: 6vh;height: 6vh;"></Image>
        </MenuItem>
        <SubMenu value="item-app">
            
        </SubMenu>

        <MenuItem value="item2" :href="`/problem#/list`">
        <span class="menuitem" style="color:white;font-size: 1.1rem;">题库</span>
        </MenuItem>
        <MenuItem value="item3" :href="`/training#/list`">
        <span class="menuitem" style="color:white;font-size: 1.1rem;">题单</span>
        </MenuItem>
        <MenuItem value="item4" :href="`/contest#/list`">
        <span class="menuitem" style="color:white;font-size: 1.1rem;">比赛</span>
        </MenuItem>
        <MenuItem value="item4" :href="`/contest#/list`">
        <span class="menuitem" style="color:white;font-size: 1.1rem;">后台</span>
        </MenuItem>
        <template #operations>
            <div class="t-demo-menu--dark">
                <Button variant="text" shape="square" style="min-width: 3rem;" v-if="!logined">
                    <span class="operator" style="color:white;font-size: larger;">注册</span>
                </Button>
                <Button variant="text" shape="square" :href="`/login`" style="margin-left: 1vw;min-width: 3rem;"
                    v-if="!logined">
                    <span class="operator" style="color:white;font-size: large;">登录</span>
                </Button>
                <Link variant="text" v-if="logined" shape="square" :href="`/user#/${uid}`"
                    style="margin-left: 1vw;min-width: 3rem;">
                <userSign :uid="uid"></UserSign>
                </Link>
            </div>
        </template>
    </HeadMenu>
</template>

<style scoped>
.operator:hover {
    color: rgba(69, 69, 241, 0.8);
}
</style>