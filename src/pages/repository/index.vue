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
                 v-if="!isLoading"
                 v-on:click="starThis"
                 class="star-button"
                 :style="{'background-color':!isStared?'white':'#238FFF','border-color':isStared?'#0062ff':'#dddddd'}">
                <text class="star-button-text"
                      :style="{color:!isStared?'#238FFF':'white'}">{{isStared?'Unstar':'Star'}}</text>
            </div>
        </wxc-minibar>
        <div style="flex: 1">
            <scroller v-if="!isLoading"
                      style="flex: 1"
                      ref="main"
                      scrollable="true"
                      @scroll="onScroll"
                      alwaysScrollableVertical="true">
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
                          style="color: #0088fb;margin-top: 10px">{{website}}</text>
                    <text class="distribute"
                          v-if="updateAt"
                          style="margin-bottom: 10px;margin-top: 10px">更新于：{{updateAt}}</text>
                </div>
                <tab3 :items="tabs">
                </tab3>
                <div class="bar">
                    <div v-if="languagesSummary&&languagesSummary.length>0"
                         ref="langLine"
                         @click="onLangLineClick"
                         class="lang-line">
                        <div v-for="(item,index) in languagesSummary"
                             :style="item">
                        </div>
                    </div>
                    <label-line v-for="(item,index) in labels"
                                @onLabelClick="onLabelClick(index)"
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
                            :rightText="branchText">
                </label-line>
                <label-line :icon="require('@/res/book.png').default"
                            :useRight="false"
                            title="Readme">
                </label-line>
                <text v-if="noReadme" class="no-readme">NO README</text>
            </scroller>
            <image class="float-button"
                   ref="floatButton"
                   @click="onFloatClick"
                   v-if="!isLoading&&!isBottomShow"
                   :style="{'top':`${pageHeight-320}px`}"
                   :src="require('@/res/point.png').default">
            </image>
        </div>
        <wxc-loading :show="isLoading"
                     :loadingPic="require('@/res/loading.gif').default"
                     :need-mask="true">
        </wxc-loading>
        <wxc-popup popup-color="transparent"
                   :show="isBottomShow"
                   @wxcPopupOverlayClicked="popupOverlayBottomClick"
                   pos="bottom"
                   height="400">
            <div class="bottom-bar">

            </div>
        </wxc-popup>
        <wxc-popup popup-color="transparent"
                   :show="isBottomShow2"
                   @wxcPopupOverlayClicked="popupOverlayBottomClick2"
                   pos="bottom"
                   :height="120+langTexts.length*47.5">
            <div class="bottom-bar">
                <div v-if="isBottomShow2"
                     class="lang-list-wrapper">
                    <div v-for="(item,index) in langTexts"
                         class="lang-cell">
                        <div class="circular-box" :style="{'background-color':item.color}"/>
                        <text style="flex:1;font-size: 35px;margin-left: 20px">{{item.lang}}</text>
                        <text style="font-size: 35px;justify-self: flex-end">{{item.value}}</text>
                    </div>
                </div>
            </div>
        </wxc-popup>
    </div>
</template>

<script>
    import {WxcMinibar, WxcLoading, WxcPopup, Utils} from 'weex-ui'
    import ReposItem from "@/widget/reposItem";
    import tab3 from "@/widget/tab3";
    import LabelLine from "@/widget/labelLine";
    import utils from "@/libs/utils";
    import gitee from "@/libs/gitee";
    import format from '@/libs/date.format'
    import domino from '@/libs/domino'

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
            tab3,
            WxcLoading,
            WxcPopup,
        },
        computed: {
            labels() {
                return [
                    [code, {
                        'background-color': gitee.getLanguageColor(this.language),
                        'border-radius': '30px'
                    }, (this.language || 'language'), this.license || ''],
                    [issues, {}, "Issues", this.issues],
                    [branch2, {
                        'background-color': 'blueviolet',
                        'padding': '8px',
                        'border-radius': '30px'
                    }, "Pull Requests", this.pulls],
                ]
            },
            tabs() {
                return [
                    ['Watchs', this.watchs],
                    ['Stars', this.stars],
                    ['Forks', this.forks]
                ]
            },
            branchText() {
                return `${this.branch}-${this.branchCount}`
            },
            pageHeight: () => Utils.env.getPageHeight(),
        },
        methods: {
            onLabelClick(index) {
                switch (index) {
                    case 0: {
                        let url = weex.config.bundleUrl
                        let user = decodeURIComponent(utils.getQueryVariable(url, 'user'))
                        let repos = decodeURIComponent(utils.getQueryVariable(url, 'repos'))
                        utils.jumpTo('hierarchy', {
                            user: user,
                            repos: repos,
                            sha: this.branch,
                            title: this.branch
                        })
                    }
                        break
                    case 1: {

                    }
                        break
                    case 2: {

                    }
                        break
                }
            },
            popupOverlayBottomClick2() {
                this.isBottomShow2 = false
            },
            async onLangLineClick() {
                this.isBottomShow2 = true
            },
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
                let branch = decodeURIComponent(utils.getQueryVariable(url, 'branch'))
                let task1 = gitee.getPulls(user, repos).then(res => {
                    this.pulls = res.length
                })
                let task2 = gitee.getBranches(user, repos).then(res => {
                    this.branchCount = res.length
                })
                let task3 = this.loadExtraInfo(user, repos, branch).then(res => {
                    if (res) {
                        this.languagesSummary = res.colorLines
                        this.langTexts = res.texts
                    }
                })
                let data = await gitee.getRepos(user, repos)
                this.icon = data['owner']['avatar_url']
                this.username = data['namespace']['name']
                this.repository = data['name']
                this.distribute = data['description']
                this.website = data['homepage']
                this.updateAt = format.format(new Date(data['updated_at']), "Y年m月d日")
                this.isStared = data['stared']
                this.language = data['language'] || "其他"
                this.stars = data['stargazers_count']
                this.watchs = data['watchers_count']
                this.forks = data['forks_count']
                this.issues = data['open_issues_count']
                this.license = data['license']
                this.branch = data['default_branch']
                await Promise.all([task1, task2, task3])
            },
            async loadExtraInfo(user, repos, branch) {
                try {
                    let html = await gitee.getWebPage(user, repos, branch)
                    let document = domino.createDocument(html, true)
                    let rawArray = document.querySelectorAll('a.language-color')
                    let colorLines = []
                    for (let i = 0; i < rawArray.length; i++) {
                        let item = rawArray[i].style
                        colorLines.push({
                            'flex': Number.parseFloat(item['width']) * 10,
                            'background-color': item['background-color']
                        })
                    }
                    let texts = []
                    let languages = document.querySelector('div.viewer-wrapper')
                    if (languages && languages.children.length === 2) {
                        languages = languages.children[1]
                        for (let i = 0; i < languages.children.length; i++) {
                            let item = languages.children[i]
                            let lang = item.children[1].textContent
                            let value = item.children[2].textContent
                            let color = gitee.getLanguageColor(lang)
                            texts.push({
                                lang: lang,
                                color: color,
                                value: value
                            })
                        }
                    }
                    return {
                        texts: texts,
                        colorLines: colorLines
                    }
                } catch (e) {
                    return null
                }
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
            },
            onScroll() {
                clearTimeout(this.timer)
                utils.animate(this.$refs.floatButton, {
                    styles: {
                        transform: 'translateX(250px)',
                        transformOrigin: 'center center'
                    },
                    duration: 500, //ms
                    timingFunction: 'ease',
                    delay: 0 //ms
                })
                this.timer = setTimeout(() => {
                    utils.animate(this.$refs.floatButton, {
                        styles: {
                            transform: 'translateX(0px)',
                            transformOrigin: 'center center'
                        },
                        duration: 500, //ms
                        timingFunction: 'ease',
                        delay: 0 //ms
                    })
                }, 200)
            },
            popupOverlayBottomClick() {
                this.isBottomShow = false
            },
            onFloatClick() {
                this.isBottomShow = true
            }
        },
        async created() {
            await this.doRefresh()
            this.isLoading = false
        },
        data() {
            return {
                //data
                icon: '',
                username: '...',
                repository: '...',
                distribute: '...',
                license: null,
                website: null,
                branch: '',
                branchCount: 1,
                pulls: 0,
                updateAt: '',
                isStared: false,
                language: null,
                watchs: 0,
                stars: 0,
                forks: 0,
                issues: 0,
                //UI
                langTexts: [],
                languagesSummary: [],
                isBottomShow: false,
                isBottomShow2: false,
                timer: null,
                isShowFloat: true,
                isLoading: true,
                char: ' / ',
                refreshing: false,
                noReadme: true,
            }
        }
    }
</script>

<style scoped>

    .lang-cell {
        flex-direction: row;
        align-items: center;
        padding-bottom: 5px;
    }

    .lang-list-wrapper {
        flex: 1;
        margin: 40px;
        justify-content: center;
    }

    .circular-box {
        width: 35px;
        height: 35px;
        border-radius: 50px;
        background-color: #0088fb;
    }

    .bottom-bar {
        flex: 1;
        background-color: white;
        border-radius: 30px;
        margin: 20px;
    }

    .float-button {
        width: 110px;
        height: 110px;
        position: absolute;
        left: 600px;
    }

    .star-button {
        border-width: 2px;
        border-radius: 30px;
        align-items: center;
        justify-content: center;
        width: 120px;
        height: 50px
    }

    .star-button-text {
        font-size: 30px;
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
        margin-top: 20px;
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