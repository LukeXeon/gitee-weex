<template>
    <div>
        <scroller>
            <markdown-view :source="test">
            </markdown-view>
        </scroller>
    </div>
</template>

<script>
    import MarkdownView from "@/widget/markdownView.jsx";
    import testmd from "@/widget/testmd";

    export default {
        name: "test",
        components: {
            MarkdownView
        },
        data() {
            return {
                test: testmd
            }
        }
    }
</script>

<style src="highlight.js/styles/default.css" scoped>
</style>

<style scoped>
    .text {
        width: 750px;
        white-space: pre;
    }

    .span {
        display: block;
    }
</style>