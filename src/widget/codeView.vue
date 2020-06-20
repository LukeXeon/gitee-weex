<template>
    <div></div>
</template>

<script>
    import hljs from 'highlight.js'
    import domino from '../libs/domino'
    import utils from "@/libs/utils";

    export default {
        name: "codeView",
        props: {
            language: {
                type: String,
            },
            codeText: {
                type: String
            }
        },
        computed: {
            dom: function () {
                let html = '<code id="code">' + this.codeText + '</code>'
                html = hljs.highlightAuto(html, [this.language])
                html = "<html><head><title></title></head><body>" + html + "</body></html>"
                return domino.createDocument(html, true)
            }
        },
        created() {
            let html = '<code id="code">' + this.codeText + '</code>'
            html = hljs.highlightAuto(html, [this.language])
            utils.debug(html)
        },
        methods: {},
        // render(createElement, context) {
        //     utils.debug(hljs.highlightAuto('<code id="code">' + this.codeText + '</code>', [this.language]))
        //     function create(node) {
        //
        //     }
        //     return create(this.dom)
        // }
    }
</script>

<style scoped>
    @import '~highlight.js/styles/default.css';
</style>