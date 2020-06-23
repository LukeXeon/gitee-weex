<template>
    <div style="flex-direction: column">
        <wxc-minibar title="用户"
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
        <scroller class="wrapper"
                  scrollable="true"
                  v-if="!isLoading"
                  alwaysScrollableVertical="true">
            <refresh class="refresh"
                     :display="refreshing ? 'show' : 'hide'"
                     @refresh="onRefresh"
                     slot="header">
                <text class="indicator-text">刷新</text>
                <loading-indicator class="indicator">
                </loading-indicator>
            </refresh>
            <user-header :avatarIcon="avatarIcon"
                         :username="username"
                         :nikeName="nikeName"
                         :bio="bio"
                         :joinTime="joinTime">
            </user-header>
            <tab3 :items="items">
            </tab3>
            <contribution-view
                    style="margin-top: 30px;margin-bottom: 30px"
                    :items="contributions">
            </contribution-view>
            <label-line v-for="(item,index) in items2"
                        :key="index"
                        :icon="item[0]"
                        :title="item[1]"
                        :leftStyle="item[2]"
                        :useRight="false"
                        :click="onClick(index)">
            </label-line>
        </scroller>
        <wxc-loading :show="isLoading"
                     :loadingPic="require('@/res/loading.gif').default"
                     :need-mask="true">
        </wxc-loading>
    </div>
</template>

<script>
    import {WxcMinibar, WxcLoading} from 'weex-ui'
    import tab3 from "@/widget/tab3";
    import userHeader from "@/widget/userHeader";
    import gitee from "@/libs/gitee";
    import utils from "@/libs/utils";
    import labelLine from '@/widget/labelLine'
    import contributionView from "@/widget/contributionView";
    import loadContributions from "@/libs/loadContributions";

    let team = require('@/res/team.png').default
    let wechat = require('@/res/wechat.png').default
    let email = require('@/res/email.png').default
    let qq = require('@/res/qq.png').default
    let right = require('@/res/right.png').default


    let noLabelStyle = {
        color: "#aaaaaa"
    }

    let hasLabelStyle = {
        color: "#141414"
    }

    export default {
        name: "index",
        components: {
            WxcMinibar,
            tab3,
            userHeader,
            labelLine,
            contributionView,
            WxcLoading
        },
        methods: {
            onClick(index) {

            },
            back() {
                const navigator = weex.requireModule('navigator')
                navigator.pop()
            },
            async doRefresh() {
                let url = weex.config.bundleUrl
                let user = decodeURIComponent(utils.getQueryVariable(url, 'user'))
                let info = await gitee.getUser(user)
                this.username = info['login'];
                this.nikeName = info['name'];
                this.bio = info['bio'];
                this.avatarIcon = info['avatar_url']
                this.joinTime = new Date(info['created_at']).toLocaleDateString()
                this.items = [
                    ["仓库", info['public_repos']],
                    ["关注中", info['following']],
                    ["关注者", info['followers']],
                ]
                this.items2 = [
                    [team, info['company'] || "公司", info['company'] ? hasLabelStyle : noLabelStyle],
                    [wechat, info['wechat'] || "微信", info['wechat'] ? hasLabelStyle : noLabelStyle],
                    [qq, info['qq'] || "QQ", info['qq'] ? hasLabelStyle : noLabelStyle],
                    [email, info['email'] || '电子邮箱', info['email'] ? hasLabelStyle : noLabelStyle],
                ]
                this.contributions = await loadContributions(info['login'])
            },
            async onRefresh() {
                this.refreshing = true
                await this.doRefresh()
                this.refreshing = false
            }
        },
        async created() {
            await this.doRefresh()
            this.isLoading = false
        },
        data() {
            return {
                refreshing: false,
                username: "",
                nikeName: "",
                bio: "",
                joinTime: "",
                items: [
                    ["仓库", 0],
                    ["关注中", 0],
                    ["关注者", 0],
                ],
                avatarIcon: '',
                contributions: [],
                items2: [
                    [team, "公司", noLabelStyle],
                    [wechat, "微信", noLabelStyle],
                    [qq, "QQ", noLabelStyle],
                    [email, "电子邮箱", noLabelStyle],
                ],
                isLoading: true
            }
        }
    }
</script>

<style scoped>
    .wrapper {
        flex: 1;
        background-color: whitesmoke;
    }

    .refresh {
        width: 750px;
        display: -ms-flex;
        display: -webkit-flex;
        display: flex;
        -ms-flex-align: center;
        -webkit-align-items: center;
        -webkit-box-align: center;
        align-items: center;
    }

    .indicator-text {
        color: #888888;
        font-size: 35px;
        text-align: center;
    }

    .indicator {
        height: 40px;
        width: 40px;
        color: #238FFF;
        margin-bottom: 30px;
    }


</style>