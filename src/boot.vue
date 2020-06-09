<template>
    <div class="wrapper" style="flex-grow: 1">
        <div style="flex: 1;align-items: center;justify-content: center">
            <div style="flex-direction: column;align-items: center">
                <image class="image"
                       style="margin-top: 250px"
                       :src="logo">
                </image>
                <text style="margin-top: 40px">{{text}}</text>
            </div>
        </div>
        <div class="operations">
            <div class="button" @click="onClick">
                <text style="color: white;font-size: 35px">{{buttonText}}</text>
            </div>

        </div>
    </div>
</template>

<script>
    const modal = weex.requireModule('modal')
    let image = require('@/res/logo.png').default
    export default {
        name: "boot",
        methods: {
            onClick() {
                let self = this;
                modal.alert({
                    okTitle: "我已确认",
                    message: "gitee-weex是一个开源项目，它不会收集任何信息，甚至连服务器都没有，请放心授权此APP。"
                }, function (value) {
                    self.$router.push({
                        path: '/login'
                    })
                })
            }
        },
        data() {
            return {
                text: "使用Apache Weex开发",
                buttonText: "登录Gitee",
                logo: image
            }
        }
    }
</script>

<style scoped>
    .image {
        width: 429px;
        height: 135px;
    }

    .operations {
        height: 400px;
        flex: 0;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .button {
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        height: 100px;
        width: 600px;
        background-color: #238FFF;
    }
</style>