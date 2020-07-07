<template>
    <div>
        <wxc-minibar title="组织"
                     class="top-bar"
                     text-color="black"
                     background-color="#FBFBFB">
            <div slot="left"
                 :click="back"
                 class="left">
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
            <div style="margin-top: 20px">
                <label-line v-for="(item,index) in items"
                            :key="index"
                            :icon="item[0]"
                            :title="item[1]"
                            :click="onClick(index)">
                </label-line>
            </div>
        </scroller>
        <wxc-loading :show="isLoading"
                     :loadingPic="require('@/res/loading.gif').default"
                     :need-mask="true">
        </wxc-loading>
    </div>
</template>

<script>
    import {WxcMinibar, WxcLoading} from 'weex-ui'
    import labelLine from "@/widget/labelLine";
    import userHeader from "@/widget/userHeader";
    import gitee from "@/libs/gitee";
    import utils from "@/libs/utils";

    export default {
        name: "index",
        components: {
            WxcMinibar,
            WxcLoading,
            labelLine,
            userHeader
        },
        methods: {
            back() {
                const navigator = weex.requireModule('navigator')
                navigator.pop()
            },
            onClick(index) {

            },
            async onRefresh() {
                this.refreshing = true
                await this.doRefresh()
                this.refreshing = false
            },
            async doRefresh() {
                let url = weex.config.bundleUrl
                let name = decodeURIComponent(utils.getQueryVariable(url, 'path'))
                let data = await gitee.getOrg(name)
                this.username = data['login']
                this.bio = data['description']
                this.avatarIcon = data['avatar_url']
            }
        },
        async created() {
            try {
                await this.doRefresh()
                this.isLoading = false
            } catch (e) {
                let modal = weex.requireModule('modal')
                modal.alert({
                    message: ((e.toString() === '403' || e.toString() === '404') ? "你没有权限访问这个组织" : "未知错误")
                })
                this.back()
            }
        },
        data() {
            return {
                isLoading: true,
                refreshing: false,
                avatarIcon: '',
                username: '',
                nikeName: '',
                bio: '',
                joinTime: '',
                items: [
                    [require('@/res/repos.png').default, '查看组织仓库'],
                    [require('@/res/team.png').default, '查看组织成员']
                ]
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