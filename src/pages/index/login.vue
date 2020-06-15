<template>
    <div class="wrapper">
        <wxc-minibar title="登录gitee"
                     leftButton=""
                     text-color="while"
                     background-color="#238FFF">
            <div slot="left"
                 v-on:click="back"
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
    const navigator = weex.requireModule('navigator')
    import gitee from "@/libs/gitee";
    import {WxcMinibar} from 'weex-ui'
    import utils from "@/libs/utils";

    const modal = weex.requireModule('modal')
    const ws = weex.requireModule('webSocket')
    const stream = weex.requireModule('stream')

    export default {
        name: 'login',
        components: {
            WxcMinibar
        },
        methods: {
            back() {
                const navigator = weex.requireModule('navigator')
                navigator.pop()
            },
            test(text) {

            },
            async onLoad(event) {
                let isLogin = await gitee.handleLogin(event.url)
                if (isLogin) {
                    this.showWeb = false
//                    utils.jumpTo('index')
                    await this.$router.push({
                        path: '/index'
                    })
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
        flex: 1;
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
