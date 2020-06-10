<template>
    <div style="flex: 1">
        <wxc-minibar title="个人信息"
                     leftButton=""
                     text-color="black"
                     background-color="#FBFBFB">
        </wxc-minibar>
        <scroller class="wrapper" alwaysScrollableVertical="true">
            <refresh class="refresh" @refresh="onRefresh">
                <text style="font-size: 30px">正在加载</text>
                <loading-indicator>
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
            <div class="head-bar2">
                <div class="head-item" v-for="item in items">
                    <text style="font-size: 35px">{{item[1]}}</text>
                    <text style="font-size: 25px">{{item[0]}}</text>
                </div>
            </div>
            <div style="height: 30px"></div>
            <contribution-view
                    :items="contributions">
            </contribution-view>
            <div style="height: 30px"></div>
            <div>
                <div class="item2" v-for="(item,index) in items2" v-on:click="onClick(index)">
                    <image class="item2-icon" :src="item[0]">
                    </image>
                    <text style="margin-left: 15px;font-size: 30px">{{item[1]}}</text>
                </div>
            </div>
            <div style="height: 30px"></div>
            <div>
                <div class="item2" v-for="(item,index) in items3" v-on:click="onClick2(index)">
                    <image class="item2-icon" :src="item[0]">
                    </image>
                    <text style="margin-left: 15px;font-size: 30px;flex: 1">{{item[1]}}</text>
                    <image style="height: 30px;width: 30px;margin-right: 20px" :src="rightIcon">
                    </image>
                </div>
            </div>
        </scroller>
    </div>

</template>

<script>
    import gitee from "@/gitee";
    import contributionView from "@/contributionView";
    import {WxcMinibar} from 'weex-ui'

    let team = require('@/res/team.png').default
    let location = require('@/res/location.png').default
    let email = require('@/res/email.png').default
    let link = require('@/res/link.png').default
    let setting = require('@/res/setting.png').default
    let info = require('@/res/info.png').default
    let feedback = require('@/res/feedback.png').default
    let right = require('@/res/right.png').default

    export default {
        name: "user",
        components: {
            WxcMinibar,
            contributionView
        },
        methods: {
            onRefresh() {
            },
            onClick(index) {
            },
            onClick2(index) {
                if (index === 1) {
                    this.$router.push('/about')
                }
            }
        },
        async created() {
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
            this.contributions = await gitee.getContributions(info['login'],new Date().getFullYear())
        },
        data() {
            return {
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
                    [team, "组织"],
                    [location, "地区"],
                    [email, "邮箱"],
                    [link, "网站"]
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

    .head-bar2 {
        padding-left: 80px;
        padding-right: 80px;
        background-color: white;
        height: 100px;
        flex-direction: row;
        justify-content: space-between;
    }

    .item2 {
        border-width: 0.5px;
        border-color: #dddddd;
        background-color: white;
        align-items: center;
        border-width: 0.5px;
        border-color: #dddddd;
        height: 80px;
        flex-direction: row
    }

    .item2-icon {
        width: 50px;
        height: 50px;
        border-radius: 5px;
        margin-left: 30px
    }

    .head-item {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

</style>