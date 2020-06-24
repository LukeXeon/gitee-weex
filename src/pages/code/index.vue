<template>
    <div style="background-color: whitesmoke">
        <wxc-minibar :title="title"
                     text-color="black"
                     class="top-bar"
                     background-color="#FBFBFB">
            <div slot="left"
                 v-on:click="back"
                 style="width: 60px;height: 60px;justify-content: center;align-items: center">
                <image :src="require('@/res/back.png').default"
                       style="width: 40px;height: 40px">
                </image>
            </div>
        </wxc-minibar>
        <code-view :codeText="codeText"
                   :language="language"
                   style="flex: 1">
        </code-view>
        <wxc-loading :show="isLoading"
                     :loadingPic="require('@/res/loading.gif').default"
                     :need-mask="false">
        </wxc-loading>
    </div>
</template>

<script>
    import {WxcMinibar, WxcLoading} from 'weex-ui'
    import codeView from "@/widget/codeView";
    import utils from "@/libs/utils";
    import gitee from "@/libs/gitee";
    import {Base64} from 'js-base64'

    export default {
        components: {
            codeView,
            WxcMinibar,
            WxcLoading
        },
        name: "index",
        methods: {
            back() {
                if (!this.isLoading){
                    const navigator = weex.requireModule('navigator')
                    navigator.pop()
                }
            },
        },
        async created() {
            let url = weex.config.bundleUrl
            let user = decodeURIComponent(utils.getQueryVariable(url, 'user'))
            let repos = decodeURIComponent(utils.getQueryVariable(url, 'repos'))
            let sha = decodeURIComponent(utils.getQueryVariable(url, 'sha'))
            this.title = decodeURIComponent(utils.getQueryVariable(url, 'title'))

            function getFileType(filename) {
                let index = filename.lastIndexOf(".");
                if (index === -1) {
                    return null
                }
                return filename.substr(index + 1)
            }

            let data = await gitee.getBlob(user, repos, sha)
            if (data['size'] / 1024 > 500) {
                let modal = weex.requireModule('modal')
                modal.confirm({
                    message: '文件过大，不能在App中浏览，会导致OOM，是否打开浏览器?',
                    okTitle: '好的',
                    cancelTitle: '滚'
                }, function (value) {
                    if (value === '滚') {
                        this.back()
                    }
                })
            } else {
                this.language = getFileType(this.title)
                this.codeText = Base64.decode(data['content'])
            }
            this.isLoading = false
        },
        data() {
            return {
                title: '',
                codeText: '',
                isLoading: true,
                language: null
            }
        }
    }
</script>

<style scoped>
    .top-bar {
        border-bottom-color: #888888;
        border-bottom-width: 0.5px;
    }

</style>