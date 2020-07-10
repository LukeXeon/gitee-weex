<template>
    <div style="flex-direction: column">
        <wxc-minibar :title="title"
                     class="top-bar"
                     :text-color="isBlackMode?'#FFFFFF':'#000000'"
                     :background-color="isBlackMode?'#3f3f3f':'#f6f6f6'">
            <div slot="left"
                 v-on:click="back"
                 class="left">
                <image :src="require('@/res/back.png').default"
                       style="width: 40px;height: 40px">
                </image>
            </div>
            <div slot="right"
                 class="switch"
                 :style="{'background-color':!isBlackMode?'#3f3f3f':'#FBFBFB'}"
                 @click="onSwitch">
            </div>
        </wxc-minibar>
        <div class="image-wrapper"
             :style="{'background-color':isBlackMode?'#000000':'#FFFFFF'}">
            <image class="image"
                   resize="contain"
                   :src="url">
            </image>
        </div>
        <wxc-loading :show="isLoading"
                     :loadingPic="require('@/res/loading.gif').default"
                     :need-mask="false">
        </wxc-loading>
    </div>
</template>

<script>
    import {WxcMinibar, WxcLoading} from 'weex-ui'
    import utils from "@/libs/utils";
    import gitee from "@/libs/gitee";

    export default {
        name: "index",
        components: {
            WxcMinibar,
            WxcLoading
        },
        methods: {
            back() {
                const navigator = weex.requireModule('navigator')
                navigator.pop()
            },
            onSwitch() {
                this.isBlackMode = !this.isBlackMode
            }
        },
        async created() {
            let url = weex.config.bundleUrl
            let user = decodeURIComponent(utils.getQueryVariable(url, 'user'))
            let repos = decodeURIComponent(utils.getQueryVariable(url, 'repos'))
            let sha = decodeURIComponent(utils.getQueryVariable(url, 'sha'))
            let type = decodeURIComponent(utils.getQueryVariable(url, 'type'))
            this.title = decodeURIComponent(utils.getQueryVariable(url, 'title'))
            let data = await gitee.getBlob(user, repos, sha)
            this.url = `data:image/${type};base64,${data['content']}`
            this.isLoading = false
        },
        data() {
            return {
                title: '',
                url: '',
                isBlackMode: false,
                isLoading: true
            }
        }
    }
</script>

<style scoped>
    .top-bar {
        border-bottom-color: #888888;
        border-bottom-width: 0.5px;
    }

    .left {
        width: 60px;
        height: 60px;
        justify-content: center;
        align-items: center
    }

    .image-wrapper {
        flex: 1;
        flex-direction: column;
        justify-content: center;
        align-items: center
    }

    .image {
        width: 750px;
        height: 750px;
    }

    .switch {
        border-radius: 55px;
        background-color: #3f3f3f;
        width: 55px;
        height: 55px;
    }
</style>