<template>
    <div style="background-color: whitesmoke">
        <wxc-minibar :title="title"
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
        <list>
            <refresh class="refresh"
                     :display="refreshing ? 'show' : 'hide'"
                     @refresh="onRefresh"
                     slot="header">
                <text class="indicator-text">刷新</text>
                <loading-indicator class="indicator">
                </loading-indicator>
            </refresh>
            <cell class="cell"
                  @click="onClick(item)"
                  v-for="(item,index) in list">
                <image class="icon"
                       :src="icons[item.type]">
                </image>
                <text class="text">{{item.path}}</text>
            </cell>
        </list>
        <wxc-loading :show="isLoading" :need-mask="false">
        </wxc-loading>
    </div>
</template>

<script>
    import {WxcLoading, WxcMinibar} from 'weex-ui'
    import utils from "@/libs/utils";
    import gitee from "@/libs/gitee";

    export default {
        name: "index",
        components: {
            WxcMinibar,
            WxcLoading
        },
        methods: {
            back() {
                const navigator = weex.requireModule('navigator')
                navigator.pop()
            },
            async onRefresh() {
                this.refreshing = true
                await this.doRefresh()
                this.refreshing = false
            },
            onClick(item) {

                let url = weex.config.bundleUrl
                let user = decodeURIComponent(utils.getQueryVariable(url, 'user'))
                let repos = decodeURIComponent(utils.getQueryVariable(url, 'repos'))

                if (item.type === 'blob') {
                    let imageTypes = ['png', 'jpeg', 'jpg', 'gif', 'svg']
                    for (let i = 0; i < imageTypes.length; i++) {
                        let type = imageTypes[i]
                        if (item.path.endsWith(type)) {
                            utils.jumpTo('image', {
                                user: user,
                                repos: repos,
                                sha: item.sha,
                                title: item.path,
                                type: type
                            })
                            return
                        }
                    }
                    utils.jumpTo('code', {
                        user: user,
                        repos: repos,
                        sha: item.sha,
                        title: item.path
                    })
                } else if (item.type === 'tree') {
                    utils.jumpTo('hierarchy', {
                        user: user,
                        repos: repos,
                        sha: item.sha,
                        title: item.path
                    })
                } else if (item.type === 'commit') {
                    const modal = weex.requireModule('modal')
                    modal.alert({
                        message: "暂时不支持查看commit层级"
                    })
                }
            },
            async doRefresh() {
                let url = weex.config.bundleUrl
                let user = decodeURIComponent(utils.getQueryVariable(url, 'user'))
                let repos = decodeURIComponent(utils.getQueryVariable(url, 'repos'))
                let sha = decodeURIComponent(utils.getQueryVariable(url, 'sha'))
                this.title = decodeURIComponent(utils.getQueryVariable(url, 'title'))
                let data = await gitee.getTree(user, repos, sha)
                this.list = data['tree'].map(item => {
                    return {
                        type: item['type'],
                        sha: item['sha'],
                        path: item['path'],
                    }
                })
            }
        },
        async created() {
            await this.doRefresh()
            this.isLoading = false
        },
        data() {
            return {
                list: [],
                isLoading: true,
                refreshing: false,
                title: '',
                icons: {
                    blob: require('@/res/file.png').default,
                    tree: require('@/res/dictionary.png').default,
                    commit: require('@/res/link(1).png').default
                },
            }
        }
    }
</script>

<style scoped>
    .cell {
        background-color: white;
        height: 80px;
        flex-direction: row;
        align-items: center;
        border-bottom-width: 0.5px;
        border-bottom-color: #dddddd;
    }

    .icon {
        margin-left: 30px;
        width: 45px;
        height: 45px;
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

    .text {
        lines: 1;
        max-width: 650px;
        font-size: 30px;
        margin-left: 10px;
        text-overflow: ellipsis;
    }

</style>