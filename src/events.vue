<template>
    <div style="flex: 1">
        <wxc-minibar title="事件"
                     leftButton=""
                     text-color="black"
                     background-color="#FBFBFB"/>
        <recycle-list for="(item,index) in items">
            <cell-slot>
                <div class="item-wrapper">
                    <div class="item">
                        <div style="flex-direction: row;margin-top: 20px;margin-left: 20px">
                            <image class="icon">
                            </image>
                            <div class="text-root">
                            </div>
                        </div>
                        <div class="line2">
                            <image style="width: 40px;height: 40px;background-color: #238FFF">
                            </image>
                            <text class="create-at">在{{item[3]}}</text>
                        </div>
                    </div>
                </div>
            </cell-slot>
        </recycle-list>
    </div>
</template>


<style scoped>
    .text-root {
        flex: 1;
        flex-direction: column;
    }

    .line2 {
        flex-direction: row;
        margin-top: 10px;
        margin-left: 150px;
        margin-bottom: 10px;
    }

    .create-at {
        font-size: 30px;
        margin-left: 10px;
    }

    .icon {
        height: 120px;
        width: 120px;
        background-color: #238FFF;
        border-radius: 10px
    }

    .item-wrapper {
        padding-top: 15px;
        padding-left: 25px;
        padding-right: 25px;
    }

    .item {
        min-height: 200px;
        border-radius: 20px;
        background-color: white;
        flex-direction: column;
    }
</style>

<script>
    import {WxcMinibar} from 'weex-ui'

    export default {
        components: {
            WxcMinibar
        },
        name: "events",
        methods: {
            onClick() {

            }
        },
        data() {
            return {
                items: [
                    // 0                1           2             3
                    ["username", "eventType", "eventTarget", "createAt"],
                    ["username", "eventType", "eventTarget", "createAt"],
                    ["username", "eventType", "eventTarget", "createAt"],
                    ["username", "eventType", "eventTarget", "createAt"],
                    ["username", "eventType", "eventTarget", "createAt"],
                    ["username", "eventType", "eventTarget", "createAt"],
                    ["username", "eventType", "eventTarget", "createAt"],
                    ["username", "eventType", "eventTarget", "createAt"],
                    ["username", "eventType", "eventTarget", "createAt"],
                    ["username", "eventType", "eventTarget", "createAt"],
                    ["username", "eventType", "eventTarget", "createAt"],
                    ["username", "eventType", "eventTarget", "createAt"],
                ]
            }
        }
    }
</script>
