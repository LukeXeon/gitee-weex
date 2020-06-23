<template>
    <div style="flex-direction: column;background-color: whitesmoke;width: 750px">
        <wxc-minibar title="关于"
                     text-color="black"
                     background-color="#FBFBFB">
            <div slot="left"
                 v-on:click="back"
                 style="width: 60px;height: 60px;justify-content: center;align-items: center">
                <image :src="require('@/res/back.png').default"
                       style="width: 40px;height: 40px">
                </image>
            </div>
        </wxc-minibar>
        <scroller scrollable="true"
                  alwaysScrollableVertical="true">
            <div style="flex-direction: column;align-items: center;">
                <div class="logo-group">
                    <image class="image"
                           style="margin-top: 40px"
                           :src="require('@/res/logo.png').default">
                    </image>
                    <text style="font-size: 30px;margin-top: 20px">使用Gitee OpenAPI</text>
                    <image class="weex-logo"
                           :src="require('@/res/weex.png').default">
                    </image>
                    <text style="font-size: 30px">由Apache Weex构建跨平台UI</text>
                    <image style="width: 180px;height: 180px;margin-top: 20px"
                           :src="require('@/res/weex-ui.png').default">
                    </image>
                    <text style="font-size: 30px;margin-top: 20px">由Weex Ui提供富交互组件</text>
                    <image style="width: 180px;height: 180px;margin-top: 20px;border-radius: 20px"
                           :src="require('@/res/gcta.png').default">
                    </image>
                    <text style="font-size: 30px;margin-top: 20px">由GCTA维护</text>
                    <div style="margin-bottom: 30px"></div>
                </div>
                <div class="item-group">
                    <div class="item" v-for="(item,index) in items">
                        <text style="font-size: 30px;flex: 1">{{item}}</text>
                        <image style="height: 30px;width: 30px;margin-right: 20px;"
                               :src="require('@/res/right.png').default">
                        </image>
                    </div>
                </div>
                <div class="item-group">
                    <div class="item"
                         v-for="(item,index) in items2"
                         v-on:click="onClick2(index)">
                        <text style="font-size: 30px;flex: 1">{{item}}</text>
                        <image style="height: 30px;width: 30px;margin-right: 20px;"
                               :src="require('@/res/right.png').default">
                        </image>
                    </div>
                </div>
                <div style="margin-bottom: 50px"></div>
            </div>
        </scroller>
    </div>
</template>

<script>
    import {WxcMinibar} from 'weex-ui'
    import utils from "@/libs/utils";

    const githubUrl = 'https://github.com/LukeXeon'
    const giteeUrl = 'https://gitee.com/micro-world'
    const juejinUrl = 'https://juejin.im/user/5bbee0e86fb9a05d0e2e8617'

    export default {
        components: {
            WxcMinibar
        },
        name: "about",
        methods: {
            onClick2(id) {
                switch (id) {
                    case 0: {

                    }
                        break
                    case 1: {
                        utils.jumpTo('webview', {
                            url: githubUrl
                        })
                    }
                        break
                    case 2: {
                        utils.jumpTo('webview', {
                            url: juejinUrl
                        })
                    }
                        break
                }
            },
            back() {
                const navigator = weex.requireModule('navigator')
                navigator.pop()
            },
        },
        created() {
        },
        data() {
            return {
                url: '',
                items: [
                    "URL识别",
                    "推荐给好友"
                ],
                items2: [
                    "Gitee",
                    "Github",
                    "掘金"
                ]
            }
        }
    }
</script>

<style scoped>
    .image {
        width: 343px;
        height: 108px;
    }

    .item-group {
        flex-direction: column;
        padding-left: 30px;
        padding-right: 20px;
        margin-top: 30px;
        width: 750px;
        background-color: white;
    }

    .weex-logo {
        width: 500px;
        height: 212px;
    }

    .logo-group {
        flex-direction: column;
        align-items: center;
        background-color: white;
        margin-top: 30px;
        width: 750px
    }

    .item {
        align-items: center;
        height: 80px;
        border-bottom-width: 0.5px;
        border-bottom-color: #dddddd;
        flex-direction: row;
        background-color: white
    }
</style>