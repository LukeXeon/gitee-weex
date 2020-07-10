<template>
    <div class="wrapper">
        <wxc-minibar :title="title"
                     text-color="black"
                     class="top-bar"
                     background-color="#FBFBFB">
            <div slot="left"
                 @click="back"
                 style="width: 60px;height: 60px;justify-content: center;align-items: center">
                <image :src="require('@/res/back.png').default"
                       style="width: 40px;height: 40px">
                </image>
            </div>
        </wxc-minibar>
        <scroller alwaysScrollableVertical="true">
            <div class="input-wrapper"
                 v-if="field==='bio'">
                <textarea class="textarea"
                          @input="onInput"
                          :value="content"></textarea>
            </div>
            <div class="input-wrapper"
                 v-else>
                <input class="input"
                       @input="onInput"
                       :value="content">
            </div>
            <div class="button"
                 @click="onSummit">
                <text class="button-text">更新</text>
            </div>
        </scroller>
    </div>
</template>

<script>
    import {WxcMinibar} from 'weex-ui'
    import utils from "@/libs/utils";
    import gitee from "@/libs/gitee";

    export default {
        name: "index",
        components: {
            WxcMinibar
        },
        methods: {
            onInput(e) {
                this.content = e.value
            },
            back() {
                const navigator = weex.requireModule('navigator')
                navigator.pop()
            },
            async onSummit() {
                let modal = weex.requireModule('modal')
                let b = {}
                b[this.field] = this.content
                try {
                    await gitee.updateUser(b)
                    modal.alert({
                        message: '提交成功'
                    })
                    const bc = new BroadcastChannel('user-update')
                    bc.postMessage({})
                    this.back()
                } catch (e) {
                    modal.alert({
                        message: '提交失败，原因为：' + e
                    })
                }
            }
        },
        created() {
            let url = weex.config.bundleUrl
            this.title = decodeURIComponent(utils.getQueryVariable(url, 'title'))
            this.content = decodeURIComponent(utils.getQueryVariable(url, 'content'))
            this.field = decodeURIComponent(utils.getQueryVariable(url, 'field'))
        },
        data() {
            return {
                field: '',
                title: '',
                content: '',
            }
        }
    }
</script>

<style scoped>
    .top-bar {
        border-bottom-color: #888888;
        border-bottom-width: 0.5px;
    }

    .wrapper {
        flex-direction: column;
        background-color: whitesmoke;
    }

    .textarea {
        background-color: white;
        width: 750px;
        height: 300px;
        font-size: 30px;
        padding: 10px 5px;
        border-top-width: 0.5px;
        border-bottom-width: 0.5px;
        border-top-color: #dddddd;
        border-bottom-color: #dddddd;
    }

    .input-wrapper {
        margin-top: 30px;
    }

    .input {
        border-top-width: 0.5px;
        border-bottom-width: 0.5px;
        border-top-color: #dddddd;
        border-bottom-color: #dddddd;
        background-color: white;
        font-size: 30px;
        padding: 10px 20px;
        height: 80px;
    }

    .button {
        height: 80px;
        margin-top: 30px;
        margin-left: 20px;
        margin-right: 20px;
        border-radius: 15px;
        justify-content: center;
        align-items: center;
        background-color: #0088fb;
    }

    .button-text {
        color: white;
        font-weight: bold;
        font-size: 35px;
    }
</style>