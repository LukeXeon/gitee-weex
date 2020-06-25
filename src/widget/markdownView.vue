<template>
    <div style="flex-direction: column">

    </div>
</template>

<style scoped>
    .h1 {

    }

    .h2 {

    }

    .h3 {

    }

    .h4 {

    }

    .h5 {

    }

    .h6 {

    }
</style>

<script>

    import MarkdownIt from 'markdown-it'
    import utils from "@/libs/utils";
    import htmlUtils from "@/libs/htmlUtils";

    let text = require('@/widget/testmd.js').default


    let md = new MarkdownIt()

    export default {
        name: "markdownView",
        props: {
            source: String
        },
        created() {
            try {

                let doc = htmlUtils.createDocument('<div></div>\n<div></div>')
                utils.debug(doc.body.childNodes[1].data.endsWith('\n'))

            }catch (e) {
                utils.debug(e)
            }
        },
        data() {
            return {
                items: []
            }
        },
    }
</script>

