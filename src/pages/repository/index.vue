<template>
    <div class="container">
        <wxc-minibar
                title="仓库"
                leftButton=""
                class="top-bar"
                text-color="black"
                background-color="#FBFBFB">
            <div slot="left"
                 @click="back"
                 style="width: 60px;height: 60px;justify-content: center;align-items: center">
                <image :src="require('@/res/back.png').default"
                       style="width: 40px;height: 40px">
                </image>
            </div>
            <div slot="right"
                 v-if="!isFirstLoading"
                 v-on:click="starThis"
                 class="star-button"
                 :style="{'background-color':!isStared?'white':'#238FFF','border-color':isStared?'#0062ff':'#dddddd'}">
                <text class="star-button-text"
                      :style="{color:!isStared?'#238FFF':'white'}">{{isStared?'Unstar':'Star'}}</text>
            </div>
        </wxc-minibar>
        <div style="flex: 1">
            <scroller v-if="!isFirstLoading"
                      style="flex: 1;width: 750px"
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
                            <text class="title-text"
                                  @click="onNameClick">{{username}}</text>
                            <text class="title-text">{{char}}</text>
                            <text class="title-text">{{repository}}</text>
                        </div>
                    </div>
                    <text class="distribute">{{distribute||'暂无描述'}}</text>
                    <text class="website"
                          @click="onJumpToWeb"
                          v-if="website">{{website}}</text>
                    <text class="update-at"
                          v-if="updateAt">更新于：{{updateAt}}</text>
                </div>
                <tab3 :items="tabs">
                </tab3>
                <div class="bar">
                    <div ref="langLine"
                         class="lang-line-wrapper">
                        <div v-if="languagesSummary.length!==0"
                             @click="onLangLineClick"
                             style="flex: 1;justify-content: flex-end;align-items: center;">
                            <div class="lang-line">
                                <div v-for="(item,index) in languagesSummary"
                                     :style="item">
                                </div>
                            </div>
                        </div>
                        <div v-else
                             class="lang-line"
                             style="background-color: darkgray;">
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
                            @onLabelClick="onBranchClick"
                            :icon="require('@/res/branch(1).png').default"
                            title="Branch"
                            :rightText="branchText">
                </label-line>
                <label-line :icon="require('@/res/book.png').default"
                            :useRight="false"
                            title="Readme">
                </label-line>
            </scroller>
            <image class="float-button"
                   ref="floatButton"
                   @click="onFloatClick"
                   v-if="!isFirstLoading&&!isBottomShow"
                   :style="{'top':`${pageHeight-320}px`}"
                   :src="require('@/res/point.png').default">
            </image>
        </div>
        <wxc-popup popup-color="transparent"
                   :show="isBottomShow"
                   @wxcPopupOverlayClicked="popupOverlayBottomClick"
                   pos="bottom"
                   height="200">
            <div class="bottom-window">
                <div class="bottom-window-item"
                     @click="onButtonClick(index)"
                     v-for="(item,index) in buttons">
                    <image class="bottom-window-item-icon"
                           :src="item.icon">
                    </image>
                    <text class="bottom-window-item-text">{{item.text}}</text>
                </div>
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
                        <div class="circular-box"
                             :style="{'background-color':item.color}"/>
                        <text style="flex:1;font-size: 35px;margin-left: 20px">{{item.lang}}</text>
                        <text style="font-size: 35px;justify-self: flex-end">{{item.value}}</text>
                    </div>
                </div>
            </div>
        </wxc-popup>
        <wxc-popup popup-color="transparent"
                   :height="450"
                   :show="isBottomShow3"
                   @wxcPopupOverlayClicked="popupOverlayBottomClick3"
                   pos="bottom">
            <div class="bottom-bar"
                 style="flex-direction: column">
                <text class="branch-title">分支</text>
                <list class="branch-list">
                    <cell class="branch-item"
                          @click="onBranchItemClick(item)"
                          v-for="(item,index) in branches">
                        <image class="branch-image"
                               :src="require('@/res/branch.png').default">
                        </image>
                        <text class="branch-text">{{item}}</text>
                        <image class="branch-correct"
                               v-if="item===branch"
                               :src="require('@/res/correct.png').default">
                        </image>
                        <div style="width: 30px"></div>
                    </cell>
                </list>
                <text class="branch-tips">Tips：点击可切换分支</text>
            </div>
        </wxc-popup>
        <wxc-loading :show="isLoading||isFirstLoading"
                     :loadingPic="require('@/res/loading.gif').default"
                     :need-mask="true">
        </wxc-loading>
    </div>
</template>

<script>
    import {WxcMinibar, WxcLoading, WxcPopup, Utils} from 'weex-ui'
    import ReposItem from "@/widget/reposItem";
    import tab3 from "@/widget/tabs";
    import LabelLine from "@/widget/labelLine";
    import utils from "@/libs/utils";
    import gitee from "@/libs/gitee";
    import format from '@/libs/date.format'
    import domino from 'domino-core'
    import commits from '@/res/commits.png'
    import watch1 from '@/res/watch(1).png'
    import watch2 from '@/res/watch(2).png'
    import fork from '@/res/fork.png'
    import wiki from '@/res/wiki.png'
    import release from '@/res/release.png'

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
            pageHeight() {
                return Utils.env.getPageHeight()
            },
            buttons() {
                return [
                    {
                        icon: !this.isWatched ? watch1 : watch2,
                        text: this.isWatched ? 'Unwatch' : 'Watch'
                    },
                    {
                        icon: fork,
                        text: 'Fork'
                    },
                    {
                        icon: wiki,
                        text: 'Wiki'
                    },
                    {
                        icon: commits,
                        text: 'Commits'
                    },
                    {
                        icon: release,
                        text: 'Releases'
                    }
                ]
            }
        },
        methods: {
            onActionClick(e) {
                utils.jumpTo('webview', {
                    url: e.url
                })
            },
            onImageClick(e) {

            },
            async onButtonClick(index) {
                let url = weex.config.bundleUrl
                let user = decodeURIComponent(utils.getQueryVariable(url, 'user'))
                let repos = decodeURIComponent(utils.getQueryVariable(url, 'repos'))
                switch (index) {
                    case 0: {
                        try {
                            this.isLoading = true
                            if (this.isWatched) {
                                await gitee.cancelWatch(user, repos)
                            } else {
                                await gitee.watch(user, repos)
                            }
                            this.isWatched = !this.isWatched
                        } finally {
                            this.isLoading = false
                        }
                    }
                        break
                    case 1: {
                        let modal = weex.requireModule('modal')
                        modal.confirm({
                            message: '注意：fork会产生一个新的仓库。',
                            okTitle: '确认',
                            cancelTitle: '取消'
                        }, async (value) => {
                            if (value === '确认') {
                                try {
                                    this.isLoading = true
                                    await gitee.fork(user, repos)
                                } finally {
                                    this.isLoading = false
                                }
                            }
                        })
                    }
                        break
                    case 2: {
                        let url = `https://gitee.com/${user}/${repos}/wikis`
                        utils.jumpTo('webview', {
                            url: url
                        })
                    }
                        break
                    case 3: {
                        utils.jumpTo('commits', {
                            user: user,
                            repos: repos,
                            branch: this.branch
                        })
                    }
                        break
                    case 4: {
                        let url = `https://gitee.com/${user}/${repos}/releases`
                        utils.jumpTo('webview', {
                            url: url
                        })
                    }
                        break
                }
            },
            onNameClick() {
                switch (this.reposType) {
                    case "group": {
                        utils.jumpTo('organization', {
                            path: this.path
                        })
                    }
                        break
                    case "personal": {
                        utils.jumpTo('user', {
                            path: this.path
                        })
                    }
                        break
                    case "enterprise": {
                        let modal = weex.requireModule('modal')
                        modal.alert({
                            message: '该项目为企业项目，Gitee暂未开放获取企业信息的可用的API。'
                        })
                    }
                        break
                }
            },
            onLabelClick(index) {
                let url = weex.config.bundleUrl
                let user = decodeURIComponent(utils.getQueryVariable(url, 'user'))
                let repos = decodeURIComponent(utils.getQueryVariable(url, 'repos'))
                switch (index) {
                    case 0: {
                        utils.jumpTo('hierarchy', {
                            user: user,
                            repos: repos,
                            sha: this.branch,
                            title: this.branch
                        })
                    }
                        break
                    case 1: {
                        utils.jumpTo('issues', {
                            user: user,
                            repos: repos,
                        })
                    }
                        break
                    case 2: {
                        utils.jumpTo('pr', {
                            user: user,
                            repos: repos,
                        })
                    }
                        break
                }
            },
            popupOverlayBottomClick2() {
                this.isBottomShow2 = false
            },
            popupOverlayBottomClick3() {
                this.isBottomShow3 = false
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
                let icon = decodeURIComponent(utils.getQueryVariable(url, 'icon'))
                gitee.getPullRequests(user, repos).then(res => {
                    this.pulls = res.length >= 99 ? '99+' : res.length
                })
                gitee.getBranches(user, repos).then(res => {
                    this.branchCount = res.length >= 99 ? '99+' : res.length
                    this.branches = res.map((item) => {
                        return item.name
                    })
                })
                this.loadExtraInfo(user, repos, this.branch).then(res => {
                    if (res) {
                        this.languagesSummary = res.colorLines
                        this.langTexts = res.texts
                    }
                })

                let data = await gitee.getRepos(user, repos)
                this.icon = icon
                this.username = data['namespace']['name']
                this.repository = data['name']
                this.distribute = data['description']
                this.website = data['homepage']
                this.updateAt = format.format(new Date(data['updated_at']), "Y年m月d日")
                this.isStared = data['stared']
                this.isWatched = data['watched']
                this.language = data['language'] || "其他"
                this.stars = data['stargazers_count']
                this.watchs = data['watchers_count']
                this.forks = data['forks_count']
                this.issues = data['open_issues_count']
                this.license = data['license']
                this.reposType = data['namespace']['type']
                this.path = data['namespace']['path']
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
            },
            onBranchClick() {
                this.isBottomShow3 = true
            },
            async onBranchItemClick(item) {
                if (item !== this.branch) {
                    try {
                        this.isLoading = true
                        this.branch = item
                        await this.doRefresh()
                    } finally {
                        this.isLoading = false
                    }
                }
            }
        },
        async created() {
            let url = weex.config.bundleUrl
            this.branch = decodeURIComponent(utils.getQueryVariable(url, 'branch'))
            await this.doRefresh()
            this.isFirstLoading = false
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
                branchCount: '...',
                pulls: '...',
                updateAt: '',
                isStared: false,
                isWatched: false,
                language: null,
                watchs: 0,
                stars: 0,
                forks: 0,
                issues: 0,
                //UI
                langTexts: [],
                languagesSummary: [],
                branches: [],
                isBottomShow: false,
                isBottomShow2: false,
                isBottomShow3: false,
                timer: null,
                isShowFloat: true,
                isLoading: false,
                isFirstLoading: true,
                char: ' / ',
                refreshing: false,
                reposType: '',
                path: '',
            }
        }
    }
</script>

<style scoped>

    .top-bar {
        border-bottom-color: #888888;
        border-bottom-width: 0.5px;
    }

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
    }

    .lang-line-wrapper {
        border-top-width: 0.5px;
        border-top-color: #dddddd;
        width: 750px;
        height: 50px;
        background-color: white;
        justify-content: flex-end;
        align-items: center;
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

    .website {
        width: 600px;
        margin-left: 100px;
        lines: 1;
        text-overflow: ellipsis;
        color: #0088fb;
        margin-top: 10px;
        font-size: 28px
    }

    .update-at {
        width: 600px;
        margin-left: 100px;
        lines: 1;
        text-overflow: ellipsis;
        margin-bottom: 10px;
        margin-top: 10px;
        font-size: 28px;
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

    .bottom-window {
        flex: 1;
        background-color: white;
        border-radius: 30px;
        margin: 20px;
        flex-direction: row;
        align-items: center;
        padding-left: 10px;
        padding-right: 10px;
    }

    .bottom-window-item {
        justify-content: center;
        flex-direction: column;
        align-items: center;
        flex: 1;
    }

    .bottom-window-item-icon {
        width: 70px;
        height: 70px;
    }

    .bottom-window-item-text {
        margin-top: 5px;
        font-size: 22px;
        text-align: center;
    }

    .branch-image {
        margin-left: 20px;
        width: 40px;
        height: 40px;
    }

    .branch-item {
        background-color: white;
        border-bottom-width: 0.5px;
        border-bottom-color: #dddddd;
        padding-top: 12.5px;
        padding-bottom: 12.5px;
        flex-direction: row;
        align-items: center;
    }

    .branch-correct {
        width: 40px;
        height: 40px;
    }

    .branch-text {
        margin-left: 5px;
        flex: 1;
        lines: 1;
        text-overflow: ellipsis;
        font-weight: bold;
        font-size: 30px;
    }

    .branch-title {
        font-size: 30px;
        font-weight: bold;
        text-align: center;
        padding-top: 15px;
        padding-bottom: 10px;
        border-bottom-width: 0.5px;
        border-bottom-color: #dddddd;
    }

    .branch-list {
        flex: 1;
        background-color: whitesmoke;
    }

    .branch-tips {
        padding-top: 5px;
        padding-bottom: 5px;
        border-top-color: #dddddd;
        border-top-width: 0.5px;
        text-align: center;
        font-size: 25px;
    }
</style>