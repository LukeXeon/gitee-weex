import hljs from 'highlight.js'
import MarkdownIt from 'markdown-it'
import utils from "@/libs/utils";
import htmlUtils from "@/libs/htmlUtils";

let text = require('@/widget/testmd.js').default

let md = MarkdownIt({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (e) {

            }
        }
        return '';
    }
})

export default {
    name: "markdownView",
    props: {
        source: String
    },
    created() {
        try {
            let content = md.render(text)
            utils.copy(content)
            let doc = htmlUtils.createDocument(content)
        } catch (e) {
            utils.debug(e)
        }
    },
    data() {
        return {
            items: []
        }
    },
    render(){
        return (<div></div>)
    }
}

