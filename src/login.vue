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
             show-loading="true"
             class="webview"
             @receivedtitle="test"
             @pagestart="onLoad">
        </web>
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
            onLoad(event) {
                let router = this.$router
                gitee.handleLogin(event.url, function () {
                    router.push("/home")
                })
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

    .webview {
        width: 750px;
        flex: 1;
    }
</style>
