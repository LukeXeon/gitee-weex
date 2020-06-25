<template>
    <markdown-view>
    </markdown-view>
</template>

<script>
    import MarkdownView from "@/widget/markdownView";

    export default {
        name: "test",
        components: {
            MarkdownView
        },
        data() {
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