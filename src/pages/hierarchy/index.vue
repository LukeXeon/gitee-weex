<template>
    <div style="background-color: whitesmoke">
        <wxc-minibar :title="title"
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
        <list>
            <refresh class="refresh"
                     :display="refreshing ? 'show' : 'hide'"
                     @refresh="onRefresh"
                     slot="header">
                <text class="indicator-text">刷新</text>
                <loading-indicator class="indicator">
                </loading-indicator>
            </refresh>
<!--            <cell class="cell" v-for="(item,index) in items">-->
<!--                <image class="icon"-->
<!--                       :src="item.type==='file'?require('@/res/file.png').default:require('@/res/dictionary.png').default">-->
<!--                </image>-->
<!--                <text style="font-size: 30px;margin-left: 10px">{{item.text}}</text>-->
<!--            </cell>-->
        </list>
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
            back() {
                const navigator = weex.requireModule('navigator')
                navigator.pop()
            },
            onRefresh() {

            }
        },
        async created() {

        },
        data() {
            return {
                info: [],
                refreshing: false,
                title: '加载中',
                items: []
            }
        }
    }
</script>

<style scoped>
    .cell {
        background-color: white;
        height: 80px;
        flex-direction: row;
        align-items: center;
    }

    .icon {
        margin-left: 30px;
        width: 45px;
        height: 45px;
    }

    .refresh {
        width: 750px;
        display: -ms-flex;
        display: -webkit-flex;
        display: flex;
        -ms-flex-align: center;
        -webkit-align-items: center;
        -webkit-box-align: center;
        align-items: center;
    }

    .indicator-text {
        color: #888888;
        font-size: 35px;
        text-align: center;
    }

    .indicator {
        height: 40px;
        width: 40px;
        color: #238FFF;
        margin-bottom: 30px;
    }

</style>