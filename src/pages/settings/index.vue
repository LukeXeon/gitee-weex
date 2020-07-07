<template>
    <div class="wrapper">
        <wxc-minibar title="设置"
                     text-color="black"
                     class="top-bar"
                     background-color="#FBFBFB">
            <div slot="left"
                 @click="back"
                 class="left">
                <image :src="require('@/res/back.png').default"
                       style="width: 40px;height: 40px">
                </image>
            </div>
        </wxc-minibar>
        <scroller alwaysScrollableVertical="true"
                  style="width: 750px;flex: 1">
            <div class="group1">
                <div class="item">
                </div>
            </div>
        </scroller>
    </div>
</template>

<script>
    import {WxcMinibar} from 'weex-ui'

    export default {
        name: "index",
        components: {
            WxcMinibar
        },
        methods: {
            onClick(index) {

            },
            back() {
                const navigator = weex.requireModule('navigator')
                navigator.pop()
            },
        },
        data() {
            return {

            }
        }
    }
</script>

<style scoped>
    .wrapper {
        flex-direction: column;
        background-color: whitesmoke;
    }

    .top-bar {
        border-bottom-color: #888888;
        border-bottom-width: 0.5px;
    }

    .group1 {
        border-top-width: 0.5px;
        border-top-color: #dddddd;
        margin-top: 30px;
        width: 750px
    }

    .item {
        height: 80px;
        background-color: white;
        border-bottom-width: 0.5px;
        border-bottom-color: #dddddd;
    }

    .left {
        width: 60px;
        height: 60px;
        justify-content: center;
        align-items: center;
    }
</style>