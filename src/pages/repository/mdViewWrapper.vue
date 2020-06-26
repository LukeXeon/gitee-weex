<template>
    <scroller class="wrapper"
              :style="{height:height}"
              scroll-direction="horizontal">
        <markdown-view
                ref="md"
                style="width: 750px"
                @onActionClick="onActionClick"
                :source="content">
        </markdown-view>
    </scroller>
</template>

<script>
    import markdownView from "@/widget/markdownView.jsx";
    import utils from "@/libs/utils";

    export default {
        name: "mdViewWrapper",
        props: {
            content: String
        },
        methods: {
            onActionClick(e) {
                utils.jumpTo('webview', {
                    url: e.url
                })
            },
        },
        components: {
            markdownView
        },
        async mounted() {
            if (this.$refs.md) {
                await utils.timeout(200)
                let size = (await utils.getComponentRect(this.$refs.md)).size
                this.height = size.height
            }
        },
        data() {
            return {
                height: 750
            }
        },
    }
</script>

<style scoped>
    .wrapper {
        width: 750px;
    }
</style>