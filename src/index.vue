<template>
    <div class="wrapper" style="flex: 1">
        <router-view class="content"/>
    </div>
</template>

<script>

    function f(u) {
        return require('@/res' + u)
    }

    import gitee from "@/gitee";

    const modal = weex.requireModule('modal')

    export default {
        name: 'App',
        async created() {

        },
        data() {
            return {}
        }
    }
</script>

<style scoped>
    .wrapper {
        justify-content: center;
        align-items: center;
    }

    .content {
        flex: 1;
    }


</style>
