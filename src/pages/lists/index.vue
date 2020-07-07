<template>
    <div class="wrapper">
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
        <div class="header-wrapper">
            <scroller ref="scrollerHead"
                      class="tab-header"
                      show-scrollbar="false"
                      scroll-direction="horizontal">
                <div class="head-tabs">
                    <div class="tab"
                         v-for="(item, index) in tabs"
                         :key="index"
                         @click="onTabClick(index)"
                         :ref="'item' + index">
                        <text class="tab-title">{{item}}</text>
                    </div>
                    <div class="divider-select"
                         :style="dividerStyle">
                        <div class="select-line"></div>
                    </div>
                </div>
            </scroller>
        </div>
        <slider infinite="false"
                style="flex: 1;width: 750px;"
                :index="initIndex"
                @scroll="onSliderScroll"
                @change="onSliderChange"
                offsetXAccuracy="0.001">
            <div class="frame">
                <repos-page :model="reposLoader">
                </repos-page>
            </div>
            <div class="frame">
                <user-page :model="followerLoader">
                </user-page>
            </div>
            <div class="frame">
                <user-page :model="followingLoader">
                </user-page>
            </div>
            <div class="frame">
                <repos-page :model="starLoader">
                </repos-page>
            </div>
            <div class="frame">
                <repos-page :model="watchLoader">
                </repos-page>
            </div>
        </slider>
    </div>
</template>

<style scoped>

    .wrapper{
        background-color: whitesmoke;
        flex-direction: column;
    }

    .header-wrapper {
        height: 70px;
        width: 750px;
        background-color: #FBFBFB;
        border-bottom-color: #dddddd;
        border-bottom-width: 0.5px;
    }

    .frame {
        width: 750px;
    }

    .left {
        width: 60px;
        height: 60px;
        justify-content: center;
        align-items: center;
    }

    .tab {
        width: 180px;
        height: 70px;
        justify-content: center;
        align-items: center;
    }

    .tab-header {
        flex-direction: row;
        justify-content: stretch;
        height: 80px;
    }

    .head-tabs {
        flex-direction: row;
        position: relative;
    }

    .tab-title {
        lines: 1;
        font-weight: bold;
        font-size: 28px;
    }

    .divider-select {
        width: 180px;
        position: absolute;
        left: 0;
        bottom: 0;
        transition-property: transform;
        justify-content: center;
        align-items: center;
    }

    .select-line {
        width: 80px;
        height: 8px;
        border-radius: 10px;
        background-color: #238FFF;
    }

</style>

<script>
    import {WxcMinibar} from 'weex-ui'
    import ReposPage from "@/widget/reposPage";
    import UserPage from "@/widget/userPage";
    import utils from "@/libs/utils";
    import gitee from "@/libs/gitee";
    import format from "@/libs/date.format";

    const dom = weex.requireModule('dom')
    const emptyLoader = () => ([])
    const indexMap = {
        repos: 0,
        follower: 1,
        following: 2,
    }

    let tempIndex = 0

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
            onTabClick(index) {
                this.initIndex = index
                tempIndex = index
            },
            onSliderScroll(event) {
                let tempOffset = event.offsetXRatio;
                let translateX = 180 * tempIndex - tempOffset * 180;
                this.dividerStyle.transform = `translateX(${translateX}px)`;
            },
            onSliderChange(event) {
                tempIndex = event.index;
                let el = this.$refs['item' + tempIndex][0];
                dom.scrollToElement(el, {});
            },
        },
        created() {
            let url = weex.config.bundleUrl
            let user = decodeURIComponent(utils.getQueryVariable(url, 'path'))
            let page = decodeURIComponent(utils.getQueryVariable(url, 'page'))
            this.initIndex = indexMap[page]
            tempIndex = this.initIndex
            this.index = indexMap[page]
            this.title = user
            let translateX = tempIndex * 180
            this.dividerStyle.transform = `translateX(${translateX}px)`

            this.reposLoader = async (page) => {
                let list = []
                let data = await gitee.getOtherRepos(user, page, 20)
                for (let i = 0; i < data.length; i++) {
                    let item = data[i]
                    let color = gitee.getLanguageColor(item['language'])
                    let updatedAt = format.format(new Date(item['updated_at']), 'Y年m月d日')
                    let type = gitee.getReposType(item)
                    list.push({
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
                    })
                }
                return list
            }

            this.followingLoader = async (page) => {
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

            this.followerLoader = async (page) => {
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
                    transform: '',
                },
                tabs: ['Repository', 'Following', 'Follower', 'Stargazer', 'Watch'],
                initIndex: 0,
                reposLoader: emptyLoader,
                followingLoader: emptyLoader,
                followerLoader: emptyLoader,
                starLoader: emptyLoader,
                watchLoader: emptyLoader,
            }
        }
    }
</script>
