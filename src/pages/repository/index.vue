<template>
    <div class="container">
        <wxc-minibar
                title="仓库"
                leftButton=""
                text-color="black"
                background-color="#FBFBFB">
            <div slot="left"
                 v-on:click="back"
                 style="width: 60px;height: 60px;justify-content: center;align-items: center">
                <image :src="require('@/res/back.png').default"
                       style="width: 40px;height: 40px">
                </image>
            </div>
            <div slot="right"
                 v-on:click="starThis"
                 class="star-button"
                 :style="{'background-color':!isStared?'white':'#238FFF'}">
                <text class="star-button-text" :style="{color:!isStared?'#238FFF':'white'}">Star</text>
            </div>
        </wxc-minibar>
        <scroller alwaysScrollableVertical="true">
            <refresh class="refresh"
                     :display="refreshing ? 'show' : 'hide'"
                     @refresh="onRefresh"
                     slot="header">
                <text class="indicator-text">刷新</text>
                <loading-indicator class="indicator">
                </loading-indicator>
            </refresh>
            <div class="info">
                <div class="line1">
                    <image class="icon" :src="icon">
                    </image>
                    <div class="title-group">
                        <text class="title-text">{{username}}</text>
                        <text class="title-text">{{char}}</text>
                        <text class="title-text">{{repository}}</text>
                    </div>
                </div>
                <text class="distribute">{{distribute}}</text>
                <text class="distribute"
                      @click="onJumpToWeb"
                      v-if="website"
                      style="color: #0088fb;margin-top: 10px">{{website}}
                </text>
                <text class="distribute" style="margin-bottom: 10px;margin-top: 10px">更新于：{{updateAt}}</text>
            </div>
            <tab3 :items="tabs">
            </tab3>
            <div class="bar">
                <div class="lang-line">
                    <div style="flex: 99;background-color: #238FFF">
                    </div>
                    <div style="flex: 1;background-color: coral">
                    </div>
                </div>
                <label-line v-for="(item,index) in labels"
                            :icon="item[0]"
                            :iconStyle="item[1]"
                            :title="item[2]"
                            :rightText="item[3]"
                            :key="index">
                </label-line>
            </div>
            <label-line style="margin-top: 20px"
                        :icon="require('@/res/branch(1).png').default"
                        title="Branch"
                        rightText="1">
            </label-line>
            <label-line :icon="require('@/res/book.png').default"
                        :useRight="false"
                        title="Readme">
            </label-line>
            <text v-if="noReadme" class="no-readme">NO README</text>
        </scroller>
    </div>
</template>

<script>
    import {WxcMinibar} from 'weex-ui'
    import ReposItem from "@/widget/reposItem";
    import tab3 from "@/widget/tab3";
    import LabelLine from "@/widget/LabelLine";
    import utils from "@/libs/utils";
    import gitee from "@/libs/gitee";
    import format from '@/libs/date.format'

    const code = require('@/res/code.png').default
    const branch = require('@/res/branch(1).png').default
    const branch2 = require('@/res/branch(2).png').default
    const issues = require('@/res/issues.png').default

    export default {
        name: "index",
        components: {
            LabelLine,
            WxcMinibar,
            ReposItem,
            tab3
        },
        computed: {
            labels() {
                return [
                    [code, {
                        'background-color': gitee.getLanguageColor(this.language),
                        'border-radius': '30px'
                    }, (this.language || 'language'), `${this.license || `${this.license}-`}`],
                    [issues, {}, "Issues", 0],
                    [branch2, {
                        'background-color': 'blueviolet',
                        'padding': '6px',
                        'border-radius': '30px'
                    }, "Pull Requests", 0],
                ]
            },
            tabs() {
                return [
                    ['Watchs', this.watchs],
                    ['Stars', this.stars],
                    ['Forks', this.forks]
                ]
            },
        },
        methods: {
            onJumpToWeb() {
                utils.jumpTo('webview', {
                    url: this.website
                })
            },
            back() {
                const navigator = weex.requireModule('navigator')
                navigator.pop()
            },
            async onRefresh() {
                this.refreshing = true
                await this.doRefresh()
                this.refreshing = false
            },
            async doRefresh() {
                let url = weex.config.bundleUrl
                let user = decodeURIComponent(utils.getQueryVariable(url, 'user'))
                let repos = decodeURIComponent(utils.getQueryVariable(url, 'repos'))
                let data = await gitee.getRepos(user, repos)

                this.icon = data['owner']['avatar_url']
                this.username = data['namespace']['path']
                this.repository = data['name']
                this.distribute = data['description']
                this.website = data['homepage']
                this.updateAt = format.format(new Date(data['updated_at']), "Y年m月d日")
                //this.isStared = data['stared']

                this.language = data['language'] || "其他"
                this.stars = data['stargazers_count']
                this.watchs = data['watchers_count']
                this.forks = data['forks_count']
            },
            async starThis() {
                if (this.refreshing) {
                    return
                }
                let url = weex.config.bundleUrl
                let user = decodeURIComponent(utils.getQueryVariable(url, 'user'))
                let repos = decodeURIComponent(utils.getQueryVariable(url, 'repos'))
                if (!this.isStared) {
                    await gitee.star(user, repos)
                    this.isStared = true
                } else {
                    await gitee.cancelStar(user, repos)
                    this.isStared = false
                }
            }
        },
        created() {
            this.doRefresh()
        },
        data() {
            return {
                //data
                icon: '',
                username: 'username',
                repository: 'repository',
                distribute: 'distribute',
                license: null,
                website: null,
                updateAt: '',
                isStared: false,
                language: null,
                watchs: 0,
                stars: 0,
                forks: 0,
                //UI
                char: ' / ',
                refreshing: false,
                noReadme: true,
            }
        }
    }
</script>

<style scoped>
    .star-button {
        border-color: #dddddd;
        border-width: 2px;
        border-radius: 30px;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 50px
    }

    .star-button-text {
        font-size: 32px;
    }

    .no-readme {
        margin-top: 30px;
        width: 750px;
        height: 100px;
        font-size: 50px;
        text-align: center;
    }

    .title-group {
        flex-direction: row;
        margin-left: 20px;
        height: 50px;
        width: 600px
    }

    .container {
        background-color: whitesmoke
    }

    .lang-line {
        flex-direction: row;
        width: 750px;
        height: 30px;
        border-bottom-width: 0.5px;
        border-bottom-color: #dddddd;
    }

    .bar {
        flex-direction: column;
        background-color: white
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

    .info {
        flex-direction: column;
        background-color: white;
        border-bottom-width: 0.5px;
        border-bottom-color: #dddddd;
    }

    .distribute {
        width: 600px;
        margin-left: 100px;
        font-size: 30px;
        lines: 5;
        text-overflow: ellipsis
    }

    .line1 {
        width: 750px;
        flex-direction: row;
        margin-top: 30px;
        align-items: center;
        margin-bottom: 5px
    }

    .title-text {
        flex: 0;
        max-width: 300px;
        color: #238FFF;
        lines: 1;
        text-align: left;
        font-size: 35px;
        text-overflow: ellipsis
    }

    .icon {
        height: 50px;
        width: 50px;
        margin-left: 30px;
        border-radius: 5px
    }

</style>