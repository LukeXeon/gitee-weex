<template>
    <div style="flex: 1">
        <wxc-minibar title="我的star"
                     leftButton=""
                     text-color="black"
                     background-color="#FBFBFB"/>
        <recycle-list for="(item,index) in items">
            <cell-slot>
                <div style="flex-direction: column;background-color: white">
                    <div style="flex-direction: row;margin-top: 30px;align-items: center;margin-bottom: 5px">
                        <image style="height: 50px;width: 50px;margin-left: 30px;background-color: #238FFF; border-radius: 5px">
                        </image>
                        <text style="margin-left: 20px; font-size: 35px">username / repos</text>
                    </div>
                    <text style="margin-left: 100px; font-size: 30px;lines:5;text-overflow: ellipsis">{{item[3]}}</text>
                    <div style="margin-left: 100px;margin-top: 10px;margin-right:60px;flex-direction: row;align-items: center;justify-content: space-between">
                        <div style="flex-direction: row;align-items: center;">
                            <div style="width: 30px;height: 30px;border-radius: 30px;background-color: #238FFF"></div>
                            <text style="font-size: 30px;margin-left: 10px">{{item[6]}}</text>
                        </div>
                        <div style="flex-direction: row;align-items: center;">
                            <div style="width: 30px;height: 30px;background-color: #238FFF"></div>
                            <text style="font-size: 30px;margin-left: 10px">{{item[6]}}</text>
                        </div>
                        <div style="flex-direction: row;align-items: center;">
                            <div style="width: 30px;height: 30px;background-color: #238FFF"></div>
                            <text style="font-size: 30px;margin-left: 10px">{{item[6]}}</text>
                        </div>
                    </div>
                </div>
            </cell-slot>
        </recycle-list>
    </div>
</template>


<style scoped>

</style>

<script>
    import {WxcMinibar} from 'weex-ui'

    export default {
        components: {
            WxcMinibar
        },
        name: "star",
        data() {
            return {
                items: [
                    // 0        1            2       3             4           5       6       7        8
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"]
                ]
            }
        }
    }
</script>
