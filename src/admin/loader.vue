<script setup>
import { keepLogin } from '@/keepLogin';
import navView from '@/nav.vue';
import { Notification, Button } from '@arco-design/web-vue';
window.onhashchange = () => {
    window.location.reload();
}
keepLogin().then((res) => {
    if (res.admin == false) {
        // document = null
        // setTimeout(() => {
        let pd = document.createElement(`div`)
        pd.style = `position:fixed;top:0;left:0;width:10000px;height:100000px;background-color:white;z-index:2`
        document.body.appendChild(pd)
        Notification.error({
            title: `无访问权限`,
            content: `无管理权限或未登录`,
            closable: false
        })
        // }, 1000)
        setTimeout(() => { window.location.href = `./index.html` }, 3000);
        // window.alert(`无访问权限`);
    }
})
</script>

<template>
    <navView></navView>
    <div style="margin-left: 5rem;">
        <router-view></router-view>

    </div>
</template>
<style>
body {
    margin: 0% !important;
}
</style>