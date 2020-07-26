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
        <div class="wrapper"
             v-if="!isLoading">
            <user-header :avatarIcon="avatarIcon"
                         :username="username"
                         :nikeName="nikeName"
                         :bio="bio"
                         :joinTime="joinTime">
            </user-header>
            <div class="bar">
                <text :class="[i===index?'bar-text':'bar-text-2']"
                      v-for="(item,i) in tabs">{{item}}</text>
                <div style="flex: 1"></div>
            </div>
            <slider infinite="false"
                    @change="onChanged"
                    style="flex: 1">
                <div class="list-root">
                    <repos-page
                            style="width: 750px;flex: 1"
                            :model="reposLoader">
                    </repos-page>
                </div>
                <div class="list-root">
                    <user-page
                            style="width: 750px;flex: 1"
                            :model="userLoader">
                    </user-page>
                </div>
            </slider>
        </div>
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
    import ReposPage from "@/widget/reposPage";
    import UserPage from "@/widget/userPage";
    import format from "@/libs/date.format";

    export default {
        name: "index",
        components: {
            UserPage,
            ReposPage,
            WxcMinibar,
            WxcLoading,
            labelLine,
            userHeader
        },
        methods: {
            onChanged(e) {
                this.index = e.index
            },
            back() {
                const navigator = weex.requireModule('navigator')
                navigator.pop()
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
                avatarIcon: '',
                username: '',
                nikeName: '',
                bio: '',
                joinTime: '',
                index: 0,
                tabs: [
                    '组织的仓库',
                    '组织的成员'
                ],
                async reposLoader(page) {
                    try {
                        let url = weex.config.bundleUrl
                        let org = decodeURIComponent(utils.getQueryVariable(url, 'path'))
                        let data = await gitee.getOrgRepos(org, page, 20)
                        return data.map((item) => {
                            let color = gitee.getLanguageColor(item['language'])
                            let updatedAt = format.format(new Date(item['updated_at']), 'Y年m月d日')
                            let type = gitee.getReposType(item)
                            return {
                                icon: item['owner']['avatar_url'],
                                username: item['namespace']['path'],
                                repos: item['path'],
                                displayReposName: item['name'],
                                displayUsername: item['namespace']['name'],
                                updatedAt: updatedAt,
                                languageColor: color,
                                language: item['language'] || "其他",
                                description: item['description'],
                                starCount: item['stargazers_count'],
                                forkCount: item['forks_count'],
                                watchCount: item['watchers_count'],
                                branch: item['default_branch'],
                                type: type
                            }
                        })
                    } catch (e) {
                        utils.debug(e)
                    }
                },
                async userLoader(page) {
                    let url = weex.config.bundleUrl
                    let org = decodeURIComponent(utils.getQueryVariable(url, 'path'))
                    let data = await gitee.getOrgUsers(org, page, 20)
                    return data.map((item) => {
                        return {
                            nikeName: item['name'],
                            username: item['login'],
                            icon: item['avatar_url'],
                            url: item['html_url']
                        }
                    })
                }
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
        flex-direction: column;
        background-color: whitesmoke;
    }

    .list-root {
        flex: 1;
        width: 750px;
    }

    .bar {
        padding-left: 15px;
        align-items: center;
        background-color: white;
        height: 80px;
        width: 750px;
        flex-direction: row;
    }

    .bar-text {
        font-weight: bold;
        margin: 5px;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 15px;
        padding-right: 15px;
        border-radius: 30px;
        background-color: #0088fb;
        color: white;
        flex: 0;
        font-size: 30px;
    }

    .bar-text-2 {
        font-weight: bold;
        margin: 5px;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 15px;
        padding-right: 15px;
        border-radius: 30px;
        color: black;
        flex: 0;
        font-size: 30px;
    }
</style>