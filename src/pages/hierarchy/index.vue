<template>
    <div style="background-color: whitesmoke">
        <wxc-minibar :title="title"
                     text-color="black"
                     class="top-bar"
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
                       :src="getIcon(item)">
                </image>
                <text class="text">{{item.path}}</text>
            </cell>
        </list>
        <wxc-loading :show="isLoading"
                     :loadingPic="require('@/res/loading.gif').default"
                     :need-mask="false">
        </wxc-loading>
    </div>
</template>

<script>
    import {WxcLoading, WxcMinibar} from 'weex-ui'
    import utils from "@/libs/utils";
    import gitee from "@/libs/gitee";

    const imageTypes = ['png', 'jpeg', 'jpg', 'gif', 'svg','ico']

    function testImageType(path) {
        for (let i = 0; i < imageTypes.length; i++) {
            let type = imageTypes[i]
            if (path.endsWith(type)) {
                return type
            }
        }
        return null
    }

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
            getIcon(item) {
                switch (item.type) {
                    case 'tree':
                        return require('@/res/dictionary.png').default
                    case 'commit':
                        return require('@/res/link(1).png').default
                    case 'blob':
                        if (testImageType(item.path)) {
                            return require('@/res/image.png').default
                        } else {
                            return require('@/res/file.png').default
                        }
                }
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
                    let imageType = testImageType(item.path)
                    if (imageType) {
                        utils.jumpTo('image', {
                            user: user,
                            repos: repos,
                            sha: item.sha,
                            title: item.path,
                            type: imageType
                        })
                    } else {
                        utils.jumpTo('code', {
                            user: user,
                            repos: repos,
                            sha: item.sha,
                            title: item.path
                        })
                    }
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
            }
        }
    }
</script>

<style scoped>
    .top-bar {
        border-bottom-color: #888888;
        border-bottom-width: 0.5px;
    }

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