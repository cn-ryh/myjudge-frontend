<script setup>

window.onhashchange = () => {
    window.location.reload();
};
</script>

<template>

    <div>
        <router-view></router-view>

    </div>
</template>

<style>
body {
    margin: 0% !important;
}
</style>