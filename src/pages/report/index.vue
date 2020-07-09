<template>
    <div class="wrapper">
        <wxc-minibar title="反馈"
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
                <div class="input">
                    <textarea class="input"
                              ref="input"
                              @input="onInput"
                              placeholder="反馈内容"
                              rows="10"/>
                </div>
                <div class="env-wrapper">
                    <text class="env-text">运行环境：{{deviceModel}}-{{platform}}-{{osVersion}}</text>
                </div>
                <div class="button"
                     @click="onSubmit">
                    <text class="button-text">提交</text>
                </div>
                <div class="text-wrapper">
                    <text style="font-size: 28px">说明：反馈会以Issues的形式提交到Gitee仓库</text>
                    <text @click="openIssues"
                          style="font-size: 28px;color: #0088fb">Gitee Weex/Feedback</text>
                </div>
            </div>
        </scroller>
        <wxc-loading :show="isLoading"
                     :loadingPic="require('@/res/loading.gif').default"
                     :need-mask="true">
        </wxc-loading>
    </div>
</template>

<script>
    import {WxcMinibar,WxcLoading} from 'weex-ui'
    import gitee from "@/libs/gitee";
    import utils from "@/libs/utils";

    export default {
        components: {
            WxcMinibar,
            WxcLoading
        },
        name: "index",
        methods: {
            back() {
                const navigator = weex.requireModule('navigator')
                navigator.pop()
            },
            openIssues() {
                utils.jumpTo('issues', {
                    user: 'micro-world',
                    repos: 'gitee-weex',
                })
            },
            onInput(e) {
                this.value = e.value
            },
            async onSubmit() {
                let modal = weex.requireModule('modal')
                this.isLoading = true
                this.$refs.input.blur()
                try {
                    if (this.value || this.value.length === 0) {
                        await gitee.saveIssues(
                            'micro-world',
                            'gitee-weex',
                            'Report',
                            this.value,
                            'Report'
                        )
                    } else {
                        throw '内容不能为空'
                    }
                } catch (e) {
                    modal.alert({
                        message: '提交失败，原因为：' + e
                    })
                    return
                } finally {
                    this.isLoading = false
                }
                modal.alert({
                    message: '提交成功'
                }, this.back)
            }
        },
        created() {
            this.platform = WXEnvironment.platform
            this.osVersion = WXEnvironment.osVersion
            this.deviceModel = WXEnvironment.deviceModel
        },
        data() {
            return {
                platform: '',
                osVersion: '',
                deviceModel: '',
                value: '',
                isLoading: false,
            }
        }
    }
</script>

<style scoped>
    .text-wrapper {
        margin-top: 40px;
        flex-direction: column;
        align-items: flex-end;
        padding-right: 20px;
    }

    .env-wrapper {
        background-color: white;
        border-top-color: #dddddd;
        border-top-width: 0.5px;
        flex-direction: row;
        padding: 5px 20px;
        align-items: center;
        justify-content: flex-start;
    }

    .env-text{
        font-weight: bold;
        font-size: 28px;
    }

    .top-bar {
        border-bottom-color: #888888;
        border-bottom-width: 0.5px;
    }

    .left {
        width: 60px;
        height: 60px;
        justify-content: center;
        align-items: center;
    }

    .wrapper{
        background-color: whitesmoke;
        flex-direction: column;
    }

    .group1 {
        margin-top: 30px;
        width: 750px
    }

    .input {
        background-color: white;
        width: 750px;
        height: 250px;
        font-size: 28px;
        padding: 10px 5px;
    }

    .button{
        height: 80px;
        margin-top: 40px;
        margin-left: 20px;
        margin-right: 20px;
        border-radius: 15px;
        justify-content: center;
        align-items: center;
        background-color: #0088fb;
    }

    .button-text{
        color: white;
        font-weight: bold;
        font-size: 35px;
    }
</style>