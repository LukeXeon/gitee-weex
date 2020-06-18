<script>
    import hljs from 'highlight.js'
    import domino from '../libs/domino'

    export default {
        name: "codeView",
        props: {
            language: {
                type: String,
            },
            code: {
                type: String
            }
        },
        computed: {
            dom: function () {
                let html = '<code id="code">' + this.code + '</code>'
                html = hljs.highlightAuto(html, [this.language])
                html = "<html><head><title></title></head><body>" + html + "</body></html>"
                return domino.createDocument(html, true)
            }
        },
        methods: {

        },
        render(createElement, context) {
            function create(node) {

            }
            return create(this.dom)
        }
    }
</script>

<style scoped>
    @import '~highlight.js/styles/default.css';
</style>