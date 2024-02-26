<script setup lang="ts">
import {Icon} from '@arco-design/web-vue'
function goHome()
{
    window.location.href = `./index.html`
}
</script>
<template>
    <div style="width: 100%;height: 100%;" @click="goHome()">
        <svg width="44" height="44" viewBox="0 0 22 22" fill="none"><path clip-rule="evenodd" d="M14 21H5c-2.21 0-4-1.773-4-3.959V8.705A4.944 4.944 0 013.803 4.26L10.121 1.2a2.019 2.019 0 011.758 0l6.318 3.059A4.944 4.944 0 0121 8.705v8.336C21 19.227 19.21 21 17 21h-3z" stroke="#333" stroke-width="1.3"/><rect x="15" y="13" width="2" height="4" rx="1" fill="#333"/></svg>
    </div>
</template>
<style>
</style>