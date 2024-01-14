<script setup>
import navView from "@/nav.vue";
window.onhashchange = () => {
    window.location.reload();
}
</script>

<template>
    <navView></navView>

    <router-view style="margin-left: 100px;"></router-view>
</template>
<style>
body
{
    margin: 0% !important;
}
</style>