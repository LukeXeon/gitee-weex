<template>
    <div style="flex: 1">
        <wxc-minibar title="个人信息"
                     leftButton=""
                     text-color="black"
                     background-color="#FBFBFB">
        </wxc-minibar>
        <scroller class="wrapper"
                  scrollable="true"
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
                        @click="onClick(index)">
            </label-line>
            <div style="margin-top: 30px">
                <label-line v-for="(item,index) in items3"
                            :key="index"
                            :icon="item[0]"
                            :title="item[1]"
                            @onLabelClick="onClick2(index)">
                </label-line>
            </div>
        </scroller>
    </div>

</template>

<script>
    import gitee from "@/libs/gitee";
    import contributionView from "@/widget/contributionView";
    import {WxcMinibar} from 'weex-ui'
    import LabelLine from "@/widget/labelLine";
    import tab3 from "@/widget/tab3";
    import utils from "@/libs/utils";
    import userHeader from "@/widget/userHeader";
    import htmlUtils from "@/libs/htmlUtils";

    let team = require('@/res/team.png').default
    let wechat = require('@/res/wechat.png').default
    let email = require('@/res/email.png').default
    let qq = require('@/res/qq.png').default
    let setting = require('@/res/setting.png').default
    let info = require('@/res/info.png').default
    let feedback = require('@/res/feedback.png').default
    let right = require('@/res/right.png').default

    let noLabelStyle = {
        color: "#aaaaaa"
    }

    let hasLabelStyle = {
        color: "#141414"
    }

    export default {
        name: "user",
        components: {
            WxcMinibar,
            contributionView,
            LabelLine,
            tab3,
            userHeader
        },
        methods: {
            async onRefresh() {
                this.refreshing = true
                try {
                    await this.doRefresh();
                } finally {
                    this.refreshing = false
                }
            },
            onClick(index) {
            },
            onClick2(index) {
                if (index === 1) {
                    utils.jumpTo('about')
                }
            },
            async doRefresh() {
                let info = await gitee.loadMyInfo();
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
                this.contributions = await htmlUtils.getContributions(info['login'])
            },
        },
        async created() {
            await this.doRefresh()
        },
        data() {


            return {
                refreshing: false,
                contributions: [],
                rightIcon: right,
                avatarIcon: '',
                username: "",
                nikeName: "",
                bio: "",
                joinTime: "",
                items: [
                    ["仓库", 0],
                    ["关注中", 0],
                    ["关注者", 0],
                ],
                items2: [
                    [team, "公司", noLabelStyle],
                    [wechat, "微信", noLabelStyle],
                    [qq, "QQ", noLabelStyle],
                    [email, "电子邮箱", noLabelStyle],
                ],
                items3: [
                    [setting, "设置"],
                    [info, "关于"],
                    [feedback, "反馈"],
                ]
            }
        }
    }
</script>

<style scoped>

    .wrapper {
        background-color: whitesmoke;
        flex: 1;
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