<template>
    <repos-page-with-title
            :title="config.title"
            :model="config.loader">
    </repos-page-with-title>
</template>

<script>
    import ReposPageWithTitle from "@/widget/reposPageWithTitle";

    const configs = {
        user: {
            title: '',
            loader: () => ([])
        }
    };

    export default {
        name: "index",
        components: {
            ReposPageWithTitle
        },
        async created() {

        },
        data() {
            return {
                config: {
                    title: '加载中',
                    loader: () => ([])
                }
            }
        }
    }
</script>

<style scoped>

</style>