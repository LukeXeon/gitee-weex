<template>
    <div style="flex-direction: column">
        <wxc-minibar
                :title="title"
                leftButton=""
                class="top-bar"
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
    .top-bar {
        border-bottom-color: #888888;
        border-bottom-width: 0.5px;
    }
</style>