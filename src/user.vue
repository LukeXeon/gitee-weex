<template>
    <div style="flex: 1">
        <wxc-minibar title="个人信息"
                     leftButton=""
                     text-color="black"
                     background-color="#FBFBFB">
        </wxc-minibar>
        <scroller class="wrapper" alwaysScrollableVertical="true">
            <refresh class="refresh" @refresh="onRefresh">
                <text style="font-size: 30px">正在加载</text>
                <loading-indicator>
                </loading-indicator>
            </refresh>
            <div class="head-bar">
                <image class="head-icon">
                </image>
                <div style="flex-direction: column;margin-top: 20px;margin-left: 25px">
                    <text style="font-size: 40px;margin-top: 0px">{{username}}({{nikeName}})</text>
                    <text style="font-size: 35px;margin-top: 10px">{{bio}}</text>
                    <text style="font-size: 30px;margin-top: 10px">于{{joinTime}}加入</text>
                </div>
            </div>
            <div class="head-bar2">
                <div class="head-item" v-for="item in items">
                    <text style="font-size: 35px">{{item[1]}}</text>
                    <text style="font-size: 25px">{{item[0]}}</text>
                </div>
            </div>
            <div style="height: 30px"></div>
            <div>
                <div class="item2" v-for="item in items2">
                    <image class="item2-icon">
                    </image>
                    <text style="margin-left: 15px;font-size: 30px">{{item[1]}}</text>
                </div>
            </div>
            <div style="height: 30px"></div>
            <div>
                <div class="item2" v-for="item in items3">
                    <image class="item2-icon">
                    </image>
                    <text style="margin-left: 15px;font-size: 30px">{{item[1]}}</text>
                </div>
            </div>
        </scroller>
    </div>

</template>

<script>
    import gitee from "@/gitee";
    import {WxcMinibar} from 'weex-ui'

    export default {
        name: "user",
        components: {
            WxcMinibar
        },
        methods: {
            onRefresh() {

            }
        },
        data() {
            return {
                username: "username",
                nikeName: "nikeName",
                bio: "tag",
                joinTime: "111",
                items: [
                    ["仓库", 11],
                    ["关注中", 111],
                    ["关注者", 1111],
                ],
                items2: [
                    ["", "组织"],
                    ["", "地区"],
                    ["", "邮箱"],
                    ["", "网站"]
                ],
                items3: [
                    ["", "设置"],
                    ["", "关于"],
                    ["", "反馈"],
                ]
            }
        }
    }
</script>

<style scoped>
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

    .wrapper {
        background-color: whitesmoke;
        flex: 1;
    }

    .head-icon {
        background-color: #238FFF;
        height: 150px;
        width: 150px;
        margin-top: 25px;
        margin-left: 30px;
        border-radius: 10px
    }

    .head-bar {
        flex-direction: row;
        background-color: white;
        height: 200px;
        border-bottom-width: 0.5px;
        border-bottom-color: #dddddd
    }

    .head-bar2 {
        background-color: white;
        height: 100px;
        flex-direction: row;
        justify-content: space-between;
    }

    .item2 {
        border-width: 0.5px;
        border-color: #dddddd;
        background-color: white;
        align-items: center;
        border-width: 0.5px;
        border-color: #dddddd;
        height: 80px;
        flex-direction: row
    }

    .item2-icon {
        width: 50px;
        height: 50px;
        background-color: #238FFF;
        border-radius: 5px;
        margin-left: 30px
    }

    .head-item {
        margin-left: 60px;
        margin-right: 60px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

</style>