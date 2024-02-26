<script setup>
import navView from '@/nav.vue';

</script>

<template>
    <navView></navView>
    <div style="margin-left: 7rem;">
        <router-view></router-view>

    </div>
</template>

<style>
body
{
    margin: 0% !important;
}
</style>