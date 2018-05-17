// const VueQuillEditor = require('vue-quill-editor/dist/ssr')
import Vue from 'vue'
import {quillEditor} from 'vue-quill-editor';
const Editor = {
    install: function(Vue){
        Vue.component('Editor',quillEditor)
    }
}
Vue.use(Editor)

import 'quill/dist/quill.snow.css'
import Quill from 'quill'
import Delta from 'quill-delta'

const Clipboard = Quill.import('modules/clipboard')
class PlainTextClipboard extends Clipboard {
    onPaste (e) {
        if (e.defaultPrevented || !this.quill.isEnabled()) return;
        let range = this.quill.getSelection()
        let delta = new Delta().retain(range.index)
        let containerHeight = this.quill.container.offsetHeight;
        if (e && e.clipboardData && e.clipboardData.types && e.clipboardData.getData) {
            let text = (e.originalEvent || e).clipboardData.getData('text/plain')
            let cleanedText = this.convert(text)
            // Stop the data from actually being pasted
            e.stopPropagation()
            e.preventDefault()

            // Process cleaned text
            delta = delta.concat(cleanedText).delete(range.length)
            this.quill.updateContents(delta, Quill.sources.USER)
            // range.length contributes to delta.length()
            this.quill.setSelection(delta.length() - range.length, Quill.sources.SILENT)
            document.documentElement.scrollTop += this.quill.container.offsetHeight - containerHeight;
            return false
        }
    }
}

Quill.register('modules/clipboard', PlainTextClipboard)