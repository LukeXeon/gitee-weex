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
                        v-bind:icon="item[0]"
                        v-bind:title="item[1]"
                        v-bind:useRight="false"
                        v-on:click="onClick(index)">
            </label-line>
        </scroller>
    </div>
</template>

<script>
    import {WxcMinibar} from 'weex-ui'
    import tab3 from "@/widget/tab3";
    import userHeader from "@/widget/userHeader";


    export default {
        name: "index",
        components: {
            WxcMinibar,
            tab3,
            userHeader
        },
        methods: {
            onClick(index) {

            },
            back() {
                const navigator = weex.requireModule('navigator')
                navigator.pop()
            },
            async doRefresh() {

            },
            async onRefresh() {
                this.refreshing = true
                await this.doRefresh()
                this.refreshing = false
            }
        },
        data() {
            return {
                refreshing: false,
                username: "username",
                nikeName: "nikeName",
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
                    [team, "公司"],
                    [wechat, "微信"],
                    [qq, "QQ"],
                    [email, "电子邮箱"],
                ],
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