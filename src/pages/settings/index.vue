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
                <div class="item" @click="onClear">
                    <text class="header">清除历史搜索记录</text>
                    <image class="image"
                           :src="require('@/res/right.png').default">
                    </image>
                </div>
            </div>
        </scroller>
    </div>
</template>

<script>
    import {WxcMinibar} from 'weex-ui'
    import label2 from "@/widget/label2";
    import utils from "@/libs/utils";


    export default {
        name: "index",
        components: {
            WxcMinibar,
            label2
        },
        methods: {
            onClear() {
                let modal = weex.requireModule('modal')
                modal.confirm({
                    message: '操作不可恢复，确定需要清除吗？',
                    okTitle: '确认',
                    cancelTitle: '取消'
                }, async (op) => {
                    if (op === '确认') {
                        this.historyItems = []
                        await utils.removeKey('search_history')
                    }
                })
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

    .header {
        flex: 1;
        margin-left: 30px;
        font-size: 30px;
    }

    .image {
        width: 30px;
        height: 30px;
        margin-right: 30px;
    }

    .item {
        background-color: white;
        height: 80px;
        flex-direction: row;
        align-items: center;
        border-bottom-color:  #dddddd;
        border-bottom-width: 0.5px;
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

    .left {
        width: 60px;
        height: 60px;
        justify-content: center;
        align-items: center;
    }
</style>