<template>
    <div style="flex: 1">
        <wxc-minibar title="个人信息"
                     leftButton=""
                     text-color="black"
                     background-color="#FBFBFB">
        </wxc-minibar>
        <scroller class="wrapper"
                  alwaysScrollableVertical="true">
            <refresh class="refresh"
                     :display="refreshing ? 'show' : 'hide'"
                     @refresh="onRefresh"
                     slot="header">
                <text class="indicator-text">刷新</text>
                <loading-indicator class="indicator">
                </loading-indicator>
            </refresh>
            <div class="head-bar">
                <image class="head-icon" :src="avatarIcon">
                </image>
                <div style="flex-direction: column;margin-top: 15px;margin-left: 25px">
                    <div style="flex-direction: row;align-items: center">
                        <text style="font-size: 38px;color: #00B4FF">{{username}}</text>
                        <text style="font-size: 38px;"> ({{nikeName}})</text>
                    </div>
                    <text style="font-size: 35px;margin-top: 10px">{{bio}}</text>
                    <text style="font-size: 30px;margin-top: 10px">于{{joinTime}}加入</text>
                </div>
            </div>
            <tab3 :items="items">
            </tab3>
            <div style="height: 30px"></div>
            <contribution-view :items="contributions">
            </contribution-view>
            <div style="height: 30px"></div>
            <div>
                <label-line v-for="(item,index) in items2"
                            :key="index"
                            v-bind:icon="item[0]"
                            v-bind:title="item[1]"
                            v-bind:useRight="false"
                            v-on:click="onClick(index)">
                </label-line>
            </div>
            <div style="margin-top: 30px">
                <label-line v-for="(item,index) in items3"
                            :key="index"
                            v-bind:icon="item[0]"
                            v-bind:title="item[1]"
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
    import LabelLine from "@/widget/LabelLine";
    import tab3 from "@/widget/tab3";
    import utils from "@/libs/utils";

    let team = require('@/res/team.png').default
    let wechat = require('@/res/wechat.png').default
    let email = require('@/res/email.png').default
    let qq = require('@/res/qq.png').default
    let setting = require('@/res/setting.png').default
    let info = require('@/res/info.png').default
    let feedback = require('@/res/feedback.png').default
    let right = require('@/res/right.png').default

    export default {
        name: "user",
        components: {
            WxcMinibar,
            contributionView,
            LabelLine,
            tab3
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
                    [team, info['company'] || "公司"],
                    [wechat, info['wechat'] || "微信"],
                    [qq, info['qq'] || "QQ"],
                    [email, info['email'] || '电子邮箱'],
                ]
                this.contributions = await gitee.getContributions(info['login'], new Date().getFullYear())
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
                username: "username",
                nikeName: "nikeName",
                bio: "tag",
                joinTime: "111",
                items: [
                    ["仓库", 0],
                    ["关注中", 0],
                    ["关注者", 0],
                ],
                items2: [
                    [team, "公司"],
                    [wechat, "微信"],
                    [qq, "QQ"],
                    [email, "电子邮箱"],
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

    .wrapper {
        background-color: whitesmoke;
        flex: 1;
    }

    .head-icon {
        background-color: #238FFF;
        height: 150px;
        width: 150px;
        margin-top: 25px;
        margin-left: 30px;
        border-radius: 10px
    }

    .head-bar {
        flex-direction: row;
        background-color: white;
        height: 200px;
        border-bottom-width: 0.5px;
        border-bottom-color: #dddddd
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