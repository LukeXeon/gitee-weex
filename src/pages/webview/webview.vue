<template>
    <div style="flex: 1">
        <wxc-minibar title="浏览网页"
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
        <web v-bind:src="url"
             class="webview">
        </web>
    </div>
</template>

<script>
    import {WxcMinibar} from 'weex-ui'
    import utils from "@/libs/utils";

    export default {
        name: "webPage",
        components: {
            WxcMinibar
        },
        methods: {
            back() {
                const navigator = weex.requireModule('navigator')
                navigator.pop()
            },
        },
        created() {
            let bundleUrl = weex.config.bundleUrl;
            let url = utils.getQueryVariable(bundleUrl, 'url')
            url = decodeURIComponent(url)
            this.url = url;
        },
        data() {
            return {
                url: ""
            }
        }
    }
</script>

<style scoped>
    .webview {
        width: 750px;
        flex: 1;
    }
</style>