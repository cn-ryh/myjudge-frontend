<script setup>
import { ref } from 'vue'
import axio from 'axios'
import { ip } from '../ip'
import { openDB, updateDB } from '@/indexdb.mjs';
import { Notification } from '@arco-design/web-vue';
import navView from '@/nav.vue';
window.onhashchange = () => {
    window.location.reload();
}
const user = ref(``);
const pass = ref(``);
function login(user_name, password) {
    axio.post(`${ip}/login`, {
        head: user_name,
        password: password
    }).then((res) => {

        if (res.data.nouser == true) {
            Notification.error({
                title: `登录失败`,
                content: `用户不存在`
            })
            return;
        }
        if (res.data.login == true) {
            openDB("frontendData", "frontendData", 1).then((db) => {
                updateDB(db, "frontendData", { id: "user", uid: res.data.uid, token: res.data.usertoken }).then(() => {
                    // window.alert("登录成功")

                    Notification.success({
                        title: `登录成功`,
                        content: `三秒后跳转到主页`
                    })
                    setTimeout(() => {
                        window.location.href = `./index.html`
                    }, 3000);

                }).catch((err) => {
                    console.error(err);
                });
            }).catch((err) => {
                console.error(err);
            })
        }
        else {
            window.alert(`用户名或密码错误，请重试！`)
        }
    }).catch((err) => {
        console.error(err);
    })
}
function toRegister() {
    window.location.href = `./register.html`
}
</script>
<script update></script>
<template>
    <navView></navView>
    <center>
        <div id="welcome">
            <h2><b>
                    欢迎登录长春市十一高中在线题库
                </b></h2>
            <a href="./register.html"></a>
        </div>
    </center>
    <div id="loginblock">
        <input v-model="user" id="username" class="awa" />
        <input v-model="pass" id="password" type="password" class="awa" />
        <div>
            <button @click="login(user, pass)" class="awa">登录</button>
            <button @click="toRegister()" class="awa">注册</button>
        </div>
    </div>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

button {
    background-color: aqua;
    height: 15%;
    width: 15%;
}

.awa {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 3%;
}

#loginblock {
    display: block;
    margin: auto;
    width: 50%;
    height: 50%;
    background-color: antiquewhite;
    padding: 5%;
}

body {
    margin: 0% !important;
}
</style>
