<template>
  <div class="container-left">
    <div class="editor" :ref="getEditor"></div>
  </div>
  <div class="container-right">
    <h2>预览</h2>
    <div class="ql-snow">
     <div class="ql-editor" v-html="editorContent">
    </div>
    </div>
  </div>
</template>

<script>
import { nextTick, ref, reactive } from 'vue'
import Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

const editorOptions = {
  theme: 'snow',
  modules: {
    // 工具栏的具体配置
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{'header': 1}, {'header': 2}],               // custom button values
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
      [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
      [{'direction': 'rtl'}],                         // text direction
      [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
      [{'header': [1, 2, 3, 4, 5, 6, false]}],
      [{'color': []}, {'background': []}],          // dropdown with defaults from theme
      [{'font': []}],
      [{'align': []}],
      ['clean']                                         // remove formatting button
    ],
  },
  placeholder: '请输入内容...'
}

export default {
  name: 'Editor',
  setup() {
    // @todo 样式优化
    let editor = ''
    const quill = reactive({})
    const getEditor = dom => {
      editor = dom
    }
    const editorContent = ref('')
    const initEditor = () => {
      nextTick(() => {
        quill.value = new Quill(editor, editorOptions)
        // 监听富文本编辑框内容变化
        quill.value.on('text-change', () => {
          editorContentChange()
        })
      })
    }
    const editorContentChange = () => {
      // editorContent.value = quill.value.getContents().ops[0].insert
      editorContent.value = editor.children[0].innerHTML
    }
    initEditor() // 初始化编辑器
    return {
      getEditor,
      editorContent
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  &-left {
    width: 50%;
    float: left;
    .editor {
      height: 500px;
    }
  }
  &-right {
    width: 50%;
    height: 500px;
    padding: 0px 25px;
    float: left;
    box-sizing: border-box;
  }
}
</style>
