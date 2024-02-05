<script setup>
import { ref } from 'vue';
import { keepLogin } from './keepLogin';
let showapps = ref(false);
let nowMenuView = ref(`problem`)
setTimeout(() => {
    let menurows = document.getElementsByClassName(`menu-row`)
    let inrowTimer
    for (let i = 0; i < menurows.length; i++) {
        menurows[i].addEventListener(`mouseenter`, (event) => {
            inrowTimer = setTimeout(() => {
                nowMenuView.value = event.target.id.split(`-`)[1];
            }, 150)
        })
        menurows[i].addEventListener(`mouseleave`, (event) => {
            clearTimeout(inrowTimer);
        })
    }
}, 500)
const now = window.location.href
let nxtLinkMain = ref(``)
let nxtLinkHash = ref(``)
function jump() {
    window.location.href = `./${nxtLinkMain.value}.html#/${nxtLinkHash.value}`;
}
function jumpRecord() {
    keepLogin().then((res) => {
        if (res.logined) {
            window.location.href = `./record.html#/list?user=${res.uid}`;
        }
        else {
            window.location.href = `./record.html#/list`;
        }
    })
}
</script>

<template>
    <nav class="lfe-body">
        <div style="margin-bottom: 20px;">
            <a href="./index.html">
                <img src="logo.png" style="width: 100%;height: auto;">
            </a>
        </div>
        <div @click="showapps = true" id="showApps" class="popup-button" style="margin-bottom: 35%;">
            应用
        </div>
        <a href="./problem.html#/list" class="color-none" style="color: inherit;">
            <span class="text">
                题库
            </span>
        </a>
        <a href="./training.html#/list" class="color-none" style="color: inherit;">
            <span class="text">
                题单
            </span>
        </a>
        <a href="./contest.html#/list" class="color-none" style="color: inherit;">
            <span class="text">
                比赛
            </span>
        </a>
        <a @click="jumpRecord()" class="color-none" style="color: inherit;">
            <span class="text">
                记录
            </span>
        </a>
        <a href="./discuss.html" class="color-none" style="color: inherit;">
            <span class="text">
                讨论
            </span>
        </a>
    </nav>
    <div id="apps" v-show="showapps">
        <div style="background-color: aliceblue;width: 80%;height: 70%;position: relative;;">
            <div class="menu-rows">
                <div class="menu-row" id="menu-problem">
                    <span style="width: 100%;">题目</span>

                </div>
                <div class="menu-row" id="menu-admin">
                    <span style="width: 100%;">
                        管理
                    </span>
                </div>
                <div class="menu-row" id="menu-record">
                    <span style="width: 100%;">
                        提交记录
                    </span>
                </div>
                <div class="menu-row" id="menu-apps">
                    <span style="width: 100%;">
                        应用
                    </span>
                </div>
            </div>
            <div class="menu-shows">
                <div class="menu-show" v-show="nowMenuView == `problem`">
                    <div>
                        <a href="./problem.html#/list">
                            <span>题目列表</span>
                        </a>
                    </div>
                </div>
                <div class="menu-show" v-show="nowMenuView == `admin`">
                    <div>
                        <a href="./admin.html#/newproblem">
                            <span>
                                新建题目
                            </span>
                        </a>
                    </div>
                    <div>
                        <a href="./admin.html#/newtraining">
                            <span>
                                新建题单
                            </span>
                        </a>
                    </div>
                    <div>
                        <a href="./admin.html#/blog">
                            <span>
                                文章管理
                            </span>
                        </a>
                    </div>
                </div>
                <div class="menu-show" v-show="nowMenuView == `record`">
                    <div>
                        <a href="./record.html#/list" style="height: 100%;">
                            <span>
                                提交记录
                            </span>
                        </a>
                    </div>
                </div>
                <div class="menu-show" v-show="nowMenuView == `apps`">
                    <div>
                        <a href="./editor.html">
                            <span>
                                在线编辑器
                            </span>
                        </a>
                    </div>
                    <div>
                        <a href="./files.html">
                            <span>文件系统</span>
                        </a>
                    </div>
                    <div>
                        <p>链接跳转</p>
                        <span>
                            <AInputGroup>
                                <AInput style="width: 25rem;" v-model="nxtLinkMain">
                                    <template #prepend>
                                        <span>11OJ/</span>
                                    </template>
                                    <template #append>
                                        <span>.html#/</span>
                                    </template>
                                </AInput>
                                <AInput style="width: 10rem;" v-model="nxtLinkHash">

                                </AInput>
                            </AInputGroup>

                            <Button @click="jump()">确认</Button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <Button @click="showapps = false" style="position: fixed; top: 20px;right: 20px;width: 3rem;height: 2rem;">关闭
        </Button>

    </div>
</template>
<style>
.menu-rows {
    border-right-style: outset;
    border-right-width: 5px;
    border-right-color: bisque;
    width: 10%;
    height: 90%;
}

a :hover {
    cursor: pointer
}

.menu-show {
    position: absolute;
    right: 0;
    top: 0;
    height: 92%;
    width: 90%;
    padding: 3% 5%;
    flex: 1;
}

.menu-show>div {
    margin-bottom: 3%;
}

.menu-show div a {
    display: inline-block;
    height: 100%;
    width: 15%;
    text-decoration: none !important;
}

.menu-show a span {
    display: flex;
    width: 100%;
    height: 3rem;
    text-align: center;
    background-color: aqua;
    align-items: center;
    justify-content: center;
}

.menu-shows * {
    color: black !important;
}

.menu-shows {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 89.5%;
    flex: 1;
    background-color: beige;
    color: black !important;
}

.menu-rows :not(:last-child) {
    border-bottom-style: outset;
    border-bottom-width: 3px;
    border-bottom-color: rgba(232, 243, 174, 0.763);
}

.menu-row {
    text-align: center;
    display: flex;
    height: 5%;
    padding: 20px 0;
    -webkit-box-direction: normal;
    -webkit-box-orient: horizontal;
    flex-direction: row;
}

#apps {
    width: 100%;
    height: 100vh;
    position: fixed;
    background-color: rgb(37 31 31 / 78%);
    z-index: 999;
    padding: 8% 10%;
    color: black;
    top: 0;
    left: 0;
    font-size: medium !important;
    /* : 999; */
}

nav {
    position: fixed;
    width: 3.7em;
    height: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    line-height: 1.2;
    z-index: 5;
    top: 0;
    left: 0;
}

.lfe-body a {
    display: block;
    text-decoration: none;
    width: 90%;
    padding: 15% 5%;
    height: 5%;
}

.lfe-body {
    background-color: #ff5700c2;
    color: rgb(255 255 255);
    font-size: large;
    font-weight: 700;
    margin-bottom: 40px;
}
</style>