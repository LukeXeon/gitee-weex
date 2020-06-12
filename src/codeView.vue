<script>
    import hljs from 'highlight.js'

    export default {
        name: "codeView",
        props: {
            code: {
                type: String
            }
        },
        computed: {
            hText: function () {
                return hljs.highlightAuto(this.code)
            }
        },
        render(createElement, context) {

        }
    }
</script>

<style scoped>
    @import '~highlight.js/styles/default.css';
</style>