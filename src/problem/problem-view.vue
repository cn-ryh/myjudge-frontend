<script setup>
import { ref } from "vue";
import AceEditor from '../AceEditor.vue';
import axio from "axios";
import { ip } from '../ip';
import { keepLogin } from "@/modules/user/getUserData";
import { Notification, Button, Card, Link } from '@arco-design/web-vue';

const problemName = ref(``);

const problemId = ref(window.location.href.split('/')[window.location.href.split('/').length - 1].split(`?`)[0]);
document.title = problemId.value;
const TimeLimit = ref(0);
const MemoryLimit = ref(0);
const problemDescription = ref(``);
axio.get(`${ip}/getProblem/${problemId.value}`).then((res) => {
    if (res.data == ``) {
        alert(`不存在的题目`);
        location.replace(`./problem/list`);
    }
    problemName.value = res.data.title;
    problemDescription.value = res.data.description;
    TimeLimit.value = res.data.TimeLimit;
    MemoryLimit.value = res.data.MemoryLimit;
});
const showsubmit = ref(false);
const showAdmin = ref(false);
keepLogin().then((res) => {
    if (res.admin) {
        showAdmin.value = true;
    }
});
/**
 * @function changeView 改变视图：显示题目界面或显示提交界面
 */
function changView() {
    if (!showsubmit.value) {
        keepLogin().then((res) => {
            const closeButton = document.createElement(`Button`);
            closeButton.innerHTML = `关闭`;
            if (res.logined == false) {
                Notification.error({
                    title: '请登录',
                    content: '三秒后自动跳转到登录界面',
                    closable: true,
                });
                setTimeout(() => {
                    window.location.href = `/login`;
                    setTimeout(() => {
                        window.location.reload();
                    }, 100);
                }, 5000);
                return;
            }
            showsubmit.value = true;
            document.getElementById(`changeViewButton`).innerText = `返回题目`;

        });
    }
    else {
        showsubmit.value = false;
        document.getElementById(`changeViewButton`).innerText = `提交题目`;
    }
}
// user codes 
const codes = ref(`#include <bits/stdc++.h>
using namespace std;
int main()
{
    return 0;
}
`);
/**
 * @function submit 提交题目
 */
function submit() {
    let flag;
    const Timer = new Date();
    if (window.location.hash.split("?")[1]) {
        if (flag == +window.location.hash.split("?")[1].match(/contestId=(\S+)/)[1]) {
            axio.get(`${ip}/getContest/${flag}`).then((res) => {
                if (Timer.getTime() > res.data.endtime) {
                    Notification.error(`比赛已结束`);
                    return;
                }
                const ed = res.data.endtime;
                window.alert(ed);
                keepLogin().then((res) => {
                    if (res.logined == false) {
                        Notification.error({
                            title: '请登录',
                            content: '三秒后自动跳转到登录界面',
                            closable: true,
                        });
                        setTimeout(() => {
                            window.location.href = `/login`;
                        }, 3000);
                    }
                    else {
                        console.log(Timer.getMonth());
                        axio.post(ip + `/problem-submit`, {
                            user: res.uid,
                            submittime: `${Timer.getFullYear()}-${Timer.getMonth() + 1}-${Timer.getDate()}  ${Timer.getHours()}:${Timer.getMinutes()}:${Timer.getSeconds()}`,
                            problem: problemId.value,
                            codes: codes.value,
                            contestId: flag
                        }).then((res) => {
                            window.location.href = `/record/${res.data}`;
                        });
                    }
                });
            });
            return;
        }

    }
    keepLogin().then((res) => {
        if (res.logined == false) {
            Notification.error({
                title: '请登录',
                content: '三秒后自动跳转到登录界面',
                closable: true,
            });
            setTimeout(() => {
                window.location.href = `/login`;
            }, 3000);
        }
        else {
            console.log(Timer.getMonth());
            axio.post(ip + `/problem-submit`, {
                user: res.uid,
                submittime: `${Timer.getFullYear()}-${Timer.getMonth() + 1}-${Timer.getDate()}  ${Timer.getHours()}:${Timer.getMinutes()}:${Timer.getSeconds()}`,
                problem: problemId.value,
                codes: codes.value,
                contestEnd: 0
            }).then((res) => {
                window.location.href = `/record/${res.data}`;
            });
        }
    });
}
/**
 * @function changVal 将用户输入的值实时更新到 value
 * @param {string} code 代码编辑器的值
 */
function changeVal(code) {
    codes.value = code;
}
</script>

<template>
    <div style="margin-left: 100px;">
        <div class="content-header ui-content-header">
            <div class="container" style="text-align: center;">
                <h1 class="content-heading">{{ problemId }} {{ problemName }}</h1>
                <p>时间限制：{{ TimeLimit }}ms&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 空间限制：{{ MemoryLimit }}MB</p>
            </div>
        </div>
        <div id="header">
            <Button @click="changView" id="changeViewButton" type="primary" status="success" size="large"
                style="padding: 10px;margin-right: 20px !important">
                提交题目
            </Button>
            <Button @click="submit" id="Submit" v-show="showsubmit" type="primary" status="success" size="large"
                style="padding: 10px;">
                提交
            </Button>
        </div>

        <AceEditor @changes="changeVal" v-show="showsubmit" :max-lines="30" :min-lines="30" style="font-size: 20px;">
        </AceEditor>

        <div v-show="(showsubmit == false)">
            <div v-html="problemDescription" style="display: inline-block;padding: 5% 5% 15%; width: 56%;">
            </div>
            <Card style="position: relative;width: 25%;height: 60rem;margin-top: 5%;float: right;">
                <Link :href="`/record/list?problem=${problemId}`">
                <span>提交记录</span>
                </Link>
                <Link :href="`/admin/problem/${problemId}`" v-show="showAdmin">
                题目管理
                </Link>
            </Card>
        </div>
    </div>
</template>

<style>
.ace-container .ace-editor {
    margin: 6% 0% !important;
    width: 95%;
}

button {
    border-radius: 5px;
    margin-right: 0 !important;
    color: #fff;
    background-color: #0e90d2;
    border-color: #0e90d2;

    display: inline-block;
    margin-bottom: 0;
    padding: .5em 1em;
    font-size: 1.rem;
    font-weight: 400;
    line-height: 1.2;
    text-align: center;
    white-space: nowrap;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 0;
    cursor: pointer;
    outline: 0;
    user-select: none;
    -webkit-transition: background-color 300ms ease-out, border-color 300ms ease-out;
    transition: background-color 300ms ease-out, border-color 300ms ease-out;

}

table {
    width: 100%;
    border-collapse: collapse;
}

table caption {
    font-size: 2em;
    font-weight: bold;
    margin: 1em 0;
}

th,
td {
    border: 1px solid #999;
    text-align: center;
    padding: 20px 0;
}

table thead tr {
    background-color: #008c8c;
    color: #fff;
}

table tbody tr:nth-child(odd) {
    background-color: #eee;
}

table tbody tr:hover {
    background-color: #ccc;
}

table tbody tr td:first-child {
    color: #f40;
}

table tfoot tr td {
    text-align: right;
    padding-right: 20px;
}

*:not(pre)code {
    background-color: aliceblue;
}

em {
    font-weight: 800;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

pre {
    background-color: black;
    font-size: medium;
    color: white;
}

pre code {
    background-color: black !important;
    font-size: large;
    color: white;
}

blockquote {
    background-color: rgba(247, 247, 247, 0.829);
    border-left-width: 10px;
    border-left-style: inset;
    border-left-color: rgb(148, 146, 146);
}
</style>