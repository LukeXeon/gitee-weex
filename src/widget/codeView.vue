<script>
    import hljs from 'highlight.js'
    import domino from '../libs/domino'
    import {CharacterData, Element} from '../libs/domino/impl'
    import utils from "@/libs/utils";

    export default {
        name: "codeView",
        props: {
            codeText: {
                type: String
            }
        },

        methods: {
            create(createElement, node) {
                let list = null
                if (node.children.length > 0) {
                    list = []
                    for (let i = 0; i < node.children.length; i++) {
                        let item = this.create(createElement, node.children[i])
                        if (item) {
                            list.push(item)
                        }
                    }
                } else {
                    let classList = []
                    for (let i = 0; i < node.classList.length; i++) {
                        let item = node.classList[i]
                        classList.push(item)
                    }
                    return createElement('span', {
                        class: classList
                    }, node.textContent)
                }
            },
        },
        render(createElement) {
            if (!this.codeText || this.codeText === '') {
                return null
            }
            try {
                let html = this.codeText
                html = hljs.highlightAuto(html).value
                html = "<html><head><title></title></head><body>" + html + "</body></html>"
                let document = domino.createDocument(html, true)
                let list = null
                utils.debug(document.body.children.length + " " + document.body.childNodes.length)
                if (document.body.children.length > 0) {
                    list = []
                    for (let i = 0; i < document.body.children.length; i++) {
                        list.push(this.create(createElement, document.body.children[i]))
                    }
                }
                return createElement('richtext', {
                    style: {
                        flex: 1,
                    }
                }, list)
            } catch (e) {
                utils.debug(e)
            }
        }
    }
</script>

<style src="highlight.js/styles/default.css" scoped>
</style>

<style scoped>

</style>