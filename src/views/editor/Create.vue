<template>
  <div>
    <p>基于QUILL的富文本编辑器</p>
    <div :ref="getEditor"></div>
    <div v-html="content.ops && content.ops[0].insert">
    </div>
    <p>预览</p>
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
    let editor = ''
    const quill = reactive({})
    const content = ref('')
    const getEditor = dom => {
      editor = dom
    }
    nextTick(() => {
      quill.value = new Quill(editor, editorOptions)
    })
    let timer = setInterval(() => {
      content.value = quill.value.getContents()
    })
    console.log(timer)
    return {
      getEditor,
      content
    }
  },
}
</script>
