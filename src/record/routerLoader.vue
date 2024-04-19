<script setup lang="ts">
import NavView from '@/modules/navView.vue';

window.onhashchange = () => {
    window.location.reload();
};
</script>
<template>
    <NavView></NavView>
    <div style="margin-left: 90px;margin-top: 4rem;">
        <router-view></router-view>
    </div>
</template>
<style>
body {
    margin: 0% !important;
}
</style>