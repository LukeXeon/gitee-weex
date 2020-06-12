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
        <scroller alwaysScrollableVertical="true">
            <div style="flex-direction: column;align-items: center;">
                <div class="image-root">
                    <image class="image"
                           :src="require('@/res/logo.png').default">
                    </image>
                </div>
                <text style="font-size: 45px;margin-top: 40px;">Gitee Weex</text>
                <div class="item-group">
                    <div class="item" v-for="(item,index) in items">
                        <text style="font-size: 30px;flex: 1">{{item}}</text>
                        <image style="height: 30px;width: 30px;margin-right: 20px;"
                               :src="require('@/res/right.png').default">
                        </image>
                    </div>
                </div>
            </div>
        </scroller>
    </div>
</template>

<script>
    import {WxcMinibar} from 'weex-ui'

    export default {
        components: {
            WxcMinibar
        },
        name: "about",
        methods: {
            back() {
                const navigator = weex.requireModule('navigator')
                navigator.pop()
            },
        },
        data() {
            return {
                items: [
                    "作者",
                    "URL识别",
                    "推荐给好友"
                ]
            }
        }
    }
</script>

<style scoped>
    .image-root {
        border-width: 0.5px;
        border-color: #dddddd;
        border-radius: 25px;
        padding: 25px 35px;
        background-color: white;
        margin-top: 100px;
    }

    .image {
        width: 429px;
        height: 135px;
    }

    .item-group {
        flex-direction: column;
        padding-left: 30px;
        padding-right: 20px;
        margin-top: 50px;
        width: 750px;
        background-color: white;
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