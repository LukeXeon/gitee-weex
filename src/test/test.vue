<template>
    <div>
        <richtext>

        </richtext>
    </div>
</template>
<script>
    import markdownTest from "@/test/markdownTest";
    import markdown from '@/libs/md/index'

    export default {
        name: "test",
        components: {
            markdown
        },
        data() {
            return {
                test: markdownTest
            }
        }
    }
</script>

<style scoped>
    .wrapper {
        width: 750px;
    }
</style>