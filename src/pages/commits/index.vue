<template>
    <div style="flex-direction: column">
        <wxc-minibar title="提交列表"
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
        <list style="flex: 1"
              alwaysScrollableVertical="true"
              @loadmore="onLoadMore">
            <refresh class="refresh"
                     :display="refreshing ? 'show' : 'hide'"
                     @refresh="onRefresh"
                     slot="header">
                <text class="indicator-text">刷新</text>
                <loading-indicator class="indicator">
                </loading-indicator>
            </refresh>
            <cell class="cell"
                  :key="index"
                  @click="onClick(item.url)"
                  v-for="(item,index) in items">
                <image class="icon"
                       resize="contain"
                       :src="require('@/res/commits(1).png').default">
                </image>
                <div class="content">
                    <text class="content-title">{{item.title}}</text>
                    <div class="content-bottom">
                        <image class="content-user-icon"
                               :src="item.icon">
                        </image>
                        <text class="content-username">{{item.username}}</text>
                        <text class="content-time">{{item.time}}</text>
                    </div>
                </div>
            </cell>
        </list>
    </div>
</template>

<script>
    import {WxcMinibar} from 'weex-ui'
    import gitee from "@/libs/gitee";
    import utils from "@/libs/utils";
    import format from '@/libs/date.format'
    import userIcon from '@/res/user.png'

    export default {
        methods: {
            back() {
                const navigator = weex.requireModule('navigator')
                navigator.pop()
            },
            onClick(url) {
                utils.jumpTo('webview', {
                    url: url
                })
            },
            async loadPage(page = 1) {
                let url = weex.config.bundleUrl
                let user = decodeURIComponent(utils.getQueryVariable(url, 'user'))
                let repos = decodeURIComponent(utils.getQueryVariable(url, 'repos'))
                let branch = decodeURIComponent(utils.getQueryVariable(url, 'branch'))
                let data = await gitee.getCommits(user, repos, branch, page, 20)
                if (data) {
                    return data.map((item) => {
                        return {
                            url: item['html_url'],
                            icon: item['committer'] ? item['committer']['avatar_url'] : userIcon,
                            time: format.format(new Date(item['commit']['committer']['date']), 'Y年m月d日'),
                            title: item['commit']['message'],
                            username: item['committer'] ? item['committer']['login'] : '未知用户'
                        }
                    })
                } else {
                    return []
                }
            },
            async onRefresh() {
                if (!this.loading) {
                    this.refreshing = true
                    try {
                        this.page = 1
                        this.items = await this.loadPage()
                    } finally {
                        this.refreshing = false
                    }
                }
            },
            async onLoadMore() {
                if (!this.refreshing) {
                    this.loading = true
                    let data = await this.loadPage(++this.page)
                    this.items.push(...data)
                    this.loading = false
                }
            }
        },
        components: {
            WxcMinibar
        },
        async created() {
            try {
                this.items = await this.loadPage()
            } catch (e) {
                utils.debug(e)
            }
        },
        name: "index",
        data() {
            return {
                items: [],
                refreshing: false,
                loading: false,
                page: 1,
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
        align-items: center;
    }

    .cell {
        flex-direction: row;
        background-color: white;
        border-bottom-width: 0.5px;
        border-bottom-color: #dddddd;
        padding-top: 10px;
        padding-bottom: 20px;
    }

    .icon {
        margin-left: 20px;
        margin-right: 5px;
        width: 50px;
        height: 50px;
    }

    .content {
        flex-direction: column;
    }

    .content-title {
        lines: 4;
        font-size: 30px;
        color: #00B4FF;
        font-weight: bold;
        margin-top: 5px;
        width: 650px;
        text-overflow: ellipsis;
    }

    .content-user-icon {
        width: 30px;
        height: 30px;
        border-radius: 5px;
    }

    .content-username {
        font-size: 30px;
        color: #999999;
        flex: 1;
        margin-left: 10px;
    }

    .content-time {
        font-size: 30px;
    }

    .content-bottom {
        margin-top: 5px;
        flex-direction: row;
        align-items: center;
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