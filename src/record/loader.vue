<script setup>
import navView from '@/nav.vue';
window.onhashchange = () => {
    window.location.reload();
}
</script>

<template>
    <navView></navView>
    <div style="margin-left: 90px;">
        <router-view></router-view>
    </div>
</template>

<style>
body {
    margin: 0% !important;
}
</style>