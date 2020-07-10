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
            <div class="group">
                <label2 title="昵称"
                        :content="name">
                </label2>
                <label2 title="简介"
                        :content="description">
                </label2>
            </div>
            <div class="group">
                <label2 title="QQ"
                        :content="qq">
                </label2>
                <label2 title="微信"
                        :content="wechat">
                </label2>
                <label2 title="邮箱"
                        :content="email">
                </label2>
            </div>
            <div class="button">
                <text class="button-text">退出</text>
            </div>
        </scroller>
        <wxc-loading :show="isLoading"
                     :loadingPic="require('@/res/loading.gif').default"
                     :need-mask="true">
        </wxc-loading>
    </div>
</template>

<script>
    import {WxcMinibar,WxcLoading} from 'weex-ui';
    import gitee from "@/libs/gitee";
    import label2 from "@/widget/label2";

    export default {
        components: {
            label2,
            WxcMinibar,
            WxcLoading
        },
        name: "index",
        methods: {
            back() {
                const navigator = weex.requireModule('navigator')
                navigator.pop()
            },
        },
        async created() {
            let data = await gitee.loadMyInfo()
            this.title = data['login']
            this.name = data['name']
            this.description = data['bio']
            this.qq = data['qq']
            this.wechat = data['wechat']
            this.email = data['email']
            this.isLoading = false
        },
        data() {
            return {
                title: '',
                name: '',
                description: '',
                qq: '',
                wechat: '',
                email: '',
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

    .wrapper {
        flex-direction: column;
        background-color: whitesmoke;
    }

    .group {
        border-top-color: #dddddd;
        border-top-width: 0.5px;
        flex-direction: column;
        margin-top: 30px;
    }

    .button {
        background-color: white;
        height: 80px;
        margin-top: 30px;
        border-top-width: 0.5px;
        border-bottom-width: 0.5px;
        border-top-color: #dddddd;
        border-bottom-color: #dddddd;
        justify-content: center;
        align-items: center;
    }

    .button-text {
        color: red;
        font-size: 30px;
        text-align: center;
    }
</style>