<script setup lang="ts">
import { Ref, ref } from 'vue';
import { markdownit } from '@/modules/MarkdownIt/markdown';
import { IDiscussion, discussType, processType } from '@/modules/interface';
import { NotifyPlugin, Button, Divider } from 'tdesign-vue-next';
import axios from 'axios';
import { ip } from '@/ip';
import UserSign from '@/modules/user/userSign.vue';

const discussion: Ref<IDiscussion> = ref({ problem: null, type: discussType.problem, id: 0, value: ``, process: processType.open, creater: 0, createTime: 0, replyTime: 0, replys: [] });
discussion.value.id = +window.location.hash.split(`/`)[1];
axios.get(`${ip}/getDiscussion/${discussion.value.id}`).then((discussionRes) => {
    console.log(discussionRes);
    if (discussionRes.data.code === 0) {
        discussion.value = discussionRes.data.data;
    }
    else {
        NotifyPlugin.error({
            title: `获取剪切板失败`,
            content: `请查看日志`
        })
        console.error(discussionRes.data.error);
    }
}).catch((err) => {
    console.error(err);
    NotifyPlugin.error({
        title: `获取剪切板失败`,
        content: `请查看日志`
    })
})
const replyReply:Ref<boolean> = ref(false);
const replyParentId: Ref<string> = ref(`${discussion.value.id}`);
const replyValue:Ref<string> = ref(``);

function changeReply()
{
    replyReply.value = false;
    replyParentId.value = discussion.value.id.toString();
}
function replyToReplys(id:string)
{
    replyParentId.value = id;
    replyReply.value = true;
}
function makeReply()
{

}
</script>

<template>
    <main>
        <div class="layui-row layui-col-space32">
            <div class="layui-col-lg8 layui-col-sm9">
                <div class="discussion card" v-html="markdownit.render(discussion.value)" style="margin-bottom: 50px;">
                </div>
                <p>回复：</p>
                <div :key="index" v-for="(item,index) of discussion.replys" class="reply card"
                    style="margin-top: 10px;margin-bottom: 10px;">
                    <div>
                        <UserSign font-color="black" show-tag :uid="item.sender"></UserSign>
                        <span>{{ new Date(item.sendTime).toLocaleString() }}</span>
                        <Button @click="replyToReplys(item.id)" style="float: right;" variant="text"
                            type="button">回复</Button>
                    </div>
                    <Divider></Divider>
                    <div v-html="markdownit.render(item.value)" style="padding: 10px 20px;"></div>
                </div>
                <div class="card" style="margin-top: 50px;">
                    <div v-if="replyReply">
                        <sapn style="color: red;">当前正在回复评论 {{ replyParentId }}</sapn>
                        <Button size="small" style="margin-left: 20px;" @click="changeReply">切换到评论该讨论</Button>
                    </div>
                    <textarea v-model="replyValue"
                        style="width: 95%;margin-top: 10px;padding: 1px 2.5%;height: 200px;resize: none;overflow: auto;"></textarea>
                    <br>
                    <Button type="submit" @click="makeReply">发射评论！</Button>
                </div>
            </div>
            <div class="layui-col-lg4 layui-col-sm3">
                <div class="card">
                    awa
                </div>
            </div>
        </div>
    </main>
</template>

<style>
.discussion.card {
    min-height: 10vh;
}
main
{
    padding: 10px 20px;
}
</style>