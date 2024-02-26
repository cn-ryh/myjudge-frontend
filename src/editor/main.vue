<script setup>
import { getDataByKey, openDB, updateDB } from '@/indexdb.mjs';
import Ace from '../AceEditor.vue'
import navView from '@/nav.vue';
import { ref } from 'vue';
let code = ref(``);
openDB("frontendData", "frontendData", 1).then((db) => {
    getDataByKey(db, "frontendData", "editor").then((res) => {
        if (res)
            if (res.code) {
                code.value = res.code;
            }
    })
})
function changeVal(code) {
    openDB("frontendData", "frontendData", 1).then((db) => {
        updateDB(db, "frontendData", { id: "editor", code: code })
    })
}
</script>

<template>
    <navView></navView>
    <Ace :value="code" :minLines="20" :max-lines="30" style="width: 94%;height: 10rem !important;margin-left: 5rem;top: 0;"
        @changes="changeVal">
    </Ace>
    <table style="position: fixed;bottom: 0px;left: 5rem;width: 90%;">
        <tr style="width: 100%;height: 10rem;">
            <td style="width: 50%;height: 100%;">
                <textarea id="input" style="width: 100%;height: 9rem;"></textarea>
            </td>
            <td style="width: 50%;height: 100%;">
                <textarea id="output" style="width: 100%;height: 9rem;"></textarea>
            </td>
        </tr>
    </table>
</template>

<style>
.ace-editor.ace_editor.ace_hidpi.ace-tomorrow-night-eighties.ace_dark {
    margin-top: 0px !important;
    height: 567px !important;
}

body {
    margin: 0px !important;
}

.ace-container {
    position: relative;
    bottom: 0px !important;
}

.ace-container .ace-editor {
    margin: 0% !important;
    margin-top: 1rem !important;
    width: 100% !important;
    height: 45rem !important;
    bottom: 0px !important;
}

.ace-container .bookmarklet {
    width: 20px !important;
    height: 20px !important;
    z-index: 2 !important;
    cursor: pointer !important;
    border-width: 9px !important;
    border-style: solid !important;
    border-color: lightblue gray gray rgb(206, 173, 230) !important;
    border-image: initial !important;
    bottom: 0px !important;
}
</style>