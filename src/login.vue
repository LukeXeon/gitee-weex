<template>
    <div class="wrapper">
        <div class="app-bar">
            <text class="title-text">{{title}}</text>
        </div>
        <web :src="webviewUrl"
             class="webview"
             @pagestart="onLoad"
             @pagefinish="">
        </web>
    </div>
</template>

<script>
    import gitee from "@/gitee";

    const modal = weex.requireModule('modal')
    const ws = weex.requireModule('webSocket')
    const stream = weex.requireModule('stream')

    export default {
        name: 'login',
        methods: {
            onLoad(event) {
                gitee.handleLogin(event.url)
            }
        },
        data() {
            return {
                title: '登录Gitee',
                webviewUrl: gitee.loginUrl
            }
        }
    }
</script>

<style scoped>
    .wrapper {
        justify-content: center;
        align-items: center;
    }

    .app-bar {
        width: 750px;
        height: 120px;
        justify-content: center;
        align-items: center;
        background-color: #238FFF;
    }

    .title-text {
        font-size: 40px;
        color: white;
    }

    .webview {
        width: 750px;
        flex: 1;
    }
</style>
