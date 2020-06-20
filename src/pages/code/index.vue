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
        <text>{{codeText}}</text>
        <wxc-loading :show="isLoading" :need-mask="false">
        </wxc-loading>
    </div>
</template>

<script>
    import {WxcMinibar} from 'weex-ui'
    import codeView from "@/widget/codeView";
    import utils from "@/libs/utils";
    import gitee from "@/libs/gitee";
    import {Base64} from 'js-base64'

    export default {
        components: {
            codeView,
            WxcMinibar
        },
        name: "index",
        methods: {
            back() {
                const navigator = weex.requireModule('navigator')
                navigator.pop()
            },
        },
        async created() {
            let url = weex.config.bundleUrl
            let user = decodeURIComponent(utils.getQueryVariable(url, 'user'))
            let repos = decodeURIComponent(utils.getQueryVariable(url, 'repos'))
            let sha = decodeURIComponent(utils.getQueryVariable(url, 'sha'))
            this.title = decodeURIComponent(utils.getQueryVariable(url, 'title'))
            let data = await gitee.getBlob(user, repos, sha)
            this.codeText = Base64.decode(data['content'])
            this.isLoading = false
        },
        data() {
            return {
                title: '',
                codeText: '',
                isLoading: true
            }
        }
    }
</script>

<style scoped>

</style>