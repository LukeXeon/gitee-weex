<template>
    <div style="background-color: whitesmoke">
        <wxc-minibar :title="title"
                     text-color="black"
                     class="top-bar"
                     background-color="#FBFBFB">
            <div slot="left"
                 @click="back"
                 class="left">
                <image :src="require('@/res/back.png').default"
                       style="width: 40px;height: 40px">
                </image>
            </div>
        </wxc-minibar>
        <scroller ref="scrollerHead"
                  class="tab-cell"
                  scroll-direction="horizontal">
            <div class="head-tabs">
                <div class="tab"
                     v-for="(item, index) in tabs"
                     :key="index"
                     :ref="'item' + index">
                    <text class="tab-title">{{item}}</text>
                </div>
                <div class="divider-select"
                     :style="dividerStyle">
                    <div class="select-line"></div>
                </div>
            </div>
        </scroller>
        <slider auto-play="false"
                @scroll="onSliderScroll"
                @change="onSliderChange"
                offsetXAccuracy="0.001">
            <repos-page class="frame"
                        :model="reposLoader">
            </repos-page>
            <user-page class="frame"
                       :model="followerLoader">
            </user-page>
            <user-page class="frame"
                       :model="followingLoader">
            </user-page>
            <repos-page class="frame"
                        :model="starLoader">
            </repos-page>
            <repos-page class="frame"
                        :model="watchLoader">
            </repos-page>
        </slider>
    </div>
</template>

<style scoped>
    .frame {
        width: 750px;
    }

    .left {
        width: 60px;
        height: 60px;
        justify-content: center;
        align-items: center
    }

    .top-bar {
        border-bottom-color: #888888;
        border-bottom-width: 0.5px;
    }

    .tab-cell {
        flex-direction: row;
        justify-content: stretch;
        background-color: #f51438;
        height: 120px;
        max-height: 120px;
    }

    .head-tabs {
        flex-direction: row;
        position: relative;
    }

    .tab-title {
        font-size: 28px;
        color: #FFF;
        margin-top: 10px;
    }

    .divider-select {
        width: 150px;
        position: absolute;
        left: 0;
        bottom: 0;
        transition-property: transform;
    }

    .select-line {
        height: 8px;
        background-color: yellow;
    }
</style>

<script>
    import {WxcMinibar} from 'weex-ui'
    import ReposPage from "@/widget/reposPage";
    import UserPage from "@/widget/userPage";
    import utils from "@/libs/utils";
    import gitee from "@/libs/gitee";
    import format from "@/libs/date.format";

    const emptyLoader = () => ([])

    export default {
        name: "index",
        components: {
            UserPage,
            ReposPage,
            WxcMinibar
        },
        methods: {
            back() {
                const navigator = weex.requireModule('navigator')
                navigator.pop()
            },
            onSliderScroll() {

            },
            onSliderChange() {

            },
        },
        async beforeCreate() {
            let url = weex.config.bundleUrl
            let user = decodeURIComponent(utils.getQueryVariable(url, 'path'))
            this.title = user

            this.reposLoader = async (page) => {
                let list = []
                let data = await gitee.getOtherRepos(user, page, 20)
                for (let i = 0; i < data.length; i++) {
                    let item = data[i]
                    let color = gitee.getLanguageColor(item['language'])
                    let updatedAt = format.format(new Date(item['updated_at']), 'Y年m月d日')
                    let type = gitee.getReposType(item)
                    list.push({
                        icon: item['namespace']['avatar_url'],
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
                    })
                }
                return list
            }

            this.followingLoader = async (page) => {
                let list = []
                let data = await gitee.getUserFollowing(user, page, 20)
                for (let i = 0; i < data.length; i++) {
                    let item = data[i]
                    list.push({
                        nikeName: item['name'],
                        username: item['login'],
                        icon: item['avatar_url'],
                        url: item['html_url']
                    })
                }
                return list
            }

            this.followerLoader = async (page) => {
                let list = []
                let data = await gitee.getUserFollowers(user, page, 20)
                for (let i = 0; i < data.length; i++) {
                    let item = data[i]
                    list.push({
                        nikeName: item['name'],
                        username: item['login'],
                        icon: item['avatar_url'],
                        url: item['html_url']
                    })
                }
                return list
            }

            this.starLoader = async (page) => {
                let data = await gitee.getStars(user, Math.max(1, page))
                let list = []
                for (let i = 0; i < data.length; i++) {
                    let item = data[i]
                    let color = gitee.getLanguageColor(item['language'])
                    let updatedAt = format.format(new Date(item['last_push_at']), 'Y年m月d日')
                    let type = gitee.getReposType(item)
                    list.push({
                        icon: item['namespace']['avatar'] || item['owner']['new_portrait'],
                        username: item['namespace']['path'],
                        repos: item['path'],
                        displayReposName: item['name'],
                        displayUsername: item['namespace']['name'],
                        updatedAt: updatedAt,
                        languageColor: color,
                        language: item['language'] || "其他",
                        description: item['description'],
                        starCount: item['stars_count'],
                        forkCount: item['forks_count'],
                        watchCount: item['watches_count'],
                        branch: item['default_branch'],
                        type: type
                    })
                }
                return list
            }

            this.watchLoader = async (page) => {
                let data = await gitee.getWatches(user, Math.max(1, page))
                let list = []
                for (let i = 0; i < data.length; i++) {
                    let item = data[i]
                    let color = gitee.getLanguageColor(item['language'])
                    let updatedAt = format.format(new Date(item['last_push_at']), 'Y年m月d日')
                    let type = gitee.getReposType(item)
                    list.push({
                        icon: item['namespace']['avatar'] || item['owner']['new_portrait'],
                        username: item['namespace']['path'],
                        repos: item['path'],
                        displayReposName: item['name'],
                        displayUsername: item['namespace']['name'],
                        updatedAt: updatedAt,
                        languageColor: color,
                        language: item['language'] || "其他",
                        description: item['description'],
                        starCount: item['stars_count'],
                        forkCount: item['forks_count'],
                        watchCount: item['watches_count'],
                        branch: item['default_branch'],
                        type: type
                    })
                }
                return list
            }
        },
        data() {
            return {
                title: '',
                dividerStyle: {
                    transform: "",
                },
                tabs: ['仓库', '关注中', '关注者', 'Star的仓库', 'Watch的仓库'],
                reposLoader: emptyLoader,
                followingLoader: emptyLoader,
                followerLoader: emptyLoader,
                starLoader: emptyLoader,
                watchLoader: emptyLoader,
            }
        }
    }
</script>
