
<template>
    <div class="ace-container">
        <!-- 官方文档中使用 id，这里禁止使用，在后期打包后容易出现问题，使用 ref 或者 DOM 就行 -->
        <div ref="ace" class="ace-editor"></div>
    </div>
</template>
  
<script>
import ace from '/ace-builds';
import '/ace-builds/webpack-resolver'; // 在 webpack 环境中使用必须要导入
import '/ace-builds/src-noconflict/theme-tomorrow_night_eighties'; // 默认设置的主题
import '/ace-builds/src-noconflict/mode-c_cpp'; // 默认设置的语言模式
import '/ace-builds/src-noconflict/snippets/c_cpp';
import '/ace-builds/src-noconflict/ext-language_tools';
const cpp_template =
    `#include <bits/stdc++.h>
using namespace std;
int main()
{
    return 0;
}
`
export default {
    name: 'AceEditor',
    props: {
        value: {
            type: String,
            default: cpp_template
        },
        themePath: {
            type: String,
            default: 'ace/theme/tomorrow_night_eighties'
        },
        // bcdadadcabccaad
        modePath: {
            type: String,
            default: 'c_cpp'
        },
        maxLines: {
            type: Number,
            default: 25
        },
        minLines: {
            type: Number,
            default: 25
        }
    },
    data() {
        return {
            aceEditor: null
        };
    },
    watch: {
        value: {
            handler(newValue) {
                if (newValue === '' || newValue) {
                    this.aceEditor.setValue(newValue);
                }
            }
        },
        modePath: {
            handler(newValue) {
                if (newValue) {
                    this.aceEditor.getSession().setMode('ace/mode/' + newValue);
                }
            }
        }
    },
    mounted() {
        this.aceEditor = ace.edit(this.$refs.ace, {
            UserActivation,
            value: this.value,
            maxLines: this.maxLines, // 最大行数，超过会自动出现滚动条
            minLines: this.minLines, // 最小行数，还未到最大行数时，编辑器会自动伸缩大小
            fontSize: 18, // 编辑器内字体大小
            theme: this.themePath, // 默认设置的主题
            mode: 'ace/mode/' + this.modePath, // 默认设置的语言模式
            tabSize: 4 // 制表符设置为 4 个空格大小
        });
        // 激活自动提示
        this.aceEditor.setOptions({
            enableSnippets: true,
            enableLiveAutocompletion: true,
            enableBasicAutocompletion: true
        });
        this.aceEditor.getSession().on('change', this.change);
    },
    methods: {
        change() {
            this.$emit('changes', this.aceEditor.getValue());
        }
    }
};

</script>
<style scoped>
.ace-container {
    position: relative;
}

.ace-container .ace-editor {
    margin: 10% 0%;
    width: 90%;
    height: 60rem;
    bottom: 50px;
}

.ace-container .bookmarklet {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 20px;
    height: 20px;
    z-index: 2;
    cursor: pointer;
    border-width: 9px;
    border-style: solid;
    border-color: lightblue gray gray rgb(206, 173, 230);
    border-image: initial;
}
</style>
  
  