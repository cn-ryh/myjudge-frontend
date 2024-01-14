<script setup>
import navView from "../nav.vue"
import TDesign from 'tdesign-vue-next';
import { Calendar } from 'tdesign-vue-next'
window.onhashchange = () => {
    window.location.reload();
}
</script>
<template>
    <navView></navView>
    <div id="page" style="margin-left: 4rem;">
        <div class="header" id="header" style="background-color: aquamarine;">
            <div class="menu" style="margin-left: 3vw;">
                <div class="menu-obj">
                    <a href="./problem.html#/list">题目列表</a>
                </div>
                <div class="menu-obj">
                    <a href="./files.html"> 文件系统 </a>
                </div>
                <div class="menu-obj" style="position: absolute;right: 2%;top: 0;padding-top: .5rem;">
                    <Link style="font-size: large;" href="./register.html"> 注册 </Link>
                    <Link style="font-size: large;" href="./login.html"> 登录 </Link>
                </div>
            </div>
        </div>

        <Card hoverable style="width: 20%;height: 18rem; position: absolute;right: 1rem;top: 4rem;">
            <Calendar theme="card">
            </Calendar>
        </Card>
        <Card style="position: absolute;width: 70%;height: 40rem;left: 7em;top:4rem">
            <!-- <a-empty style="margin-top: 25%;width: 100%;height: 100%;"/> -->
            <div>
                <H1>11 Online Judge 1.0.0 发布</H1>
                <p>大家好，经过数周的不断努力，长春市十一高中信息学竞赛在线评测系统 1.0.0 终于正式发布了。</p>
                <p>该系统前端基于 Vue 3.0 开发，使用了一些腾讯和字节跳动的前端 UI 库，后端使用 node.js + express 开发。目前支持的功能有：</p>
                <li>
                    <Link href="./problem.html#/list">
                        题目评测
                    </Link>
                </li>
                <br>
                <li>
                    <Link href="./record.html#/list">
                        提交记录
                    </Link>
                </li>
                <br>
                <li>
                    <Link href="./training.html#/list">
                        题单
                    </Link>
                </li>
                <br>
                <li>
                    <Link href="./contest.html#/list">
                        比赛（目前赛制未适配）
                    </Link>
                </li>
                <br>
                <li>
                    <Link href="./file.html#/">
                        文件系统
                    </Link>
                </li>

                <p>接下来即将支持的有：</p>
                <li>RMJ 系统（包括 Atcoder 和 Codeforces）</li>
                <br>
                <li>比赛系统（完善赛制、排行榜）</li>
                <br>
                <li>社区功能（讨论与私信）</li>
            </div>
        </Card>
    </div>
</template>
<style>
a {
    text-decoration: none;
    color: #262626;
}

.menu {
    width: 100%;
    height: 3rem;
    background-color: aquamarine;
}

main {
    background-color: rgb(71, 71, 104);
    flex: 1;
}

html body {
    height: 100%;
    margin: 0px !important;
}

.menu-obj {
    height: 4rem;
    width: 95px;
    display: inline-block;
    margin-top: auto;
    padding-top: .65rem;
    font-family: -apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", "Noto Sans", "Noto Sans CJK SC", "Noto Sans CJK", "Source Han Sans", "PingFang SC", "Segoe UI", "Microsoft YaHei", sans-serif;
    font-size: large;

}

.menu-obj .a {
    margin: auto;
}


:deep(.arco-layout-header),
:deep(.arco-layout-footer),
:deep(.arco-layout-sider-children),
:deep(.arco-layout-content) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--color-white);
    font-size: 16px;
    font-stretch: condensed;
    text-align: center;
}
</style>