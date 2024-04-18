<script setup lang="ts">
window.onhashchange = () => {
    window.location.reload();
};
</script>
<template>
    <div style="margin-left: 90px;">
        <router-view></router-view>
    </div>
</template>
<style>
body {
    margin: 0% !important;
}
</style>