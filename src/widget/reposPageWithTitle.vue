<template>
    <div style="flex-direction: column">
        <wxc-minibar
                :title="title"
                leftButton=""
                text-color="black"
                background-color="#FBFBFB"/>
        <repos-page :model="model">
        </repos-page>
    </div>
</template>

<script>
    import {WxcMinibar} from 'weex-ui'
    import reposPage from "@/widget/reposPage";

    export default {
        props: {
            model: {
                type: Function
            },
            title: {
                type: String
            }
        },
        components: {
            WxcMinibar,
            reposPage
        },
        name: "reposPageWithTitle"
    }
</script>

<style scoped>

</style>