<template>
    <div class="wrapper">
        <wxc-minibar title="登录gitee"
                     leftButton=""
                     text-color="while"
                     background-color="#238FFF">
            <div slot="left"
                 v-on:click="()=>{this.$router.back()}"
                 style="width: 60px;height: 60px;justify-content: center;align-items: center">
                <image :src="require('@/res/back(1).png').default"
                       style="width: 40px;height: 40px">
                </image>
            </div>
        </wxc-minibar>
        <web :src="webviewUrl"
             v-if="showWeb"
             show-loading="true"
             class="webview"
             @receivedtitle="test"
             @pagestart="onLoad">
        </web>
        <div v-else class="success">
            <text style="font-size: 50px">登录成功</text>
        </div>
    </div>
</template>

<script>
    import gitee from "@/gitee";
    import {WxcMinibar} from 'weex-ui'
    import utils from "@/utils";

    const modal = weex.requireModule('modal')
    const ws = weex.requireModule('webSocket')
    const stream = weex.requireModule('stream')

    export default {
        name: 'login',
        components: {
            WxcMinibar
        },
        methods: {
            test(text) {

            },
            async onLoad(event) {
                let isLogin = await gitee.handleLogin(event.url)
                if (isLogin) {
                    let router = this.$router
                    this.showWeb = false
                    await router.push("/home")
                }
            }
        },
        data() {
            return {
                showWeb: true,
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

    .success {
        flex: 1;
        width: 750px;
        background-color: white;
        justify-content: center;
        align-items: center;
    }

    .webview {
        width: 750px;
        flex: 1;
    }
</style>
