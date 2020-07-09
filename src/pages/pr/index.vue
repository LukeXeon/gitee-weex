<template>
    <div class="wrapper">
        <wxc-minibar title="Pull Requests"
                     text-color="black"
                     background-color="#FBFBFB">
            <div slot="left"
                 @click="back"
                 class="left">
                <image :src="require('@/res/back.png').default"
                       style="width: 40px;height: 40px">
                </image>
            </div>
        </wxc-minibar>
        <div class="bar2">
            <tab-view @select="onSelect"
                      ref="tabView"
                      :tabs="['Open','Closed']">
            </tab-view>
        </div>
        <slider style="flex: 1"
                infinite="false"
                @change="onScrollChanged"
                :index="index">
            <issues-page style="width: 750px"
                         :model="openLoader">
            </issues-page>
            <issues-page style="width: 750px"
                         :model="closedLoader">
            </issues-page>
        </slider>
    </div>
</template>

<script>
    import tabView from "@/widget/tabView";
    import {WxcMinibar,WxcPopup} from 'weex-ui'
    import IssuesPage from "@/widget/issuesPage";
    import utils from "@/libs/utils";
    import gitee from "@/libs/gitee";
    import format from '@/libs/date.format'

    export default {
        name: "index",
        components: {
            IssuesPage,
            tabView,
            WxcMinibar,
            WxcPopup
        },
        methods: {
            onSelect(e) {
                this.index = e.index
            },
            back() {
                const navigator = weex.requireModule('navigator')
                navigator.pop()
            },
            popupOverlayBottomClick(){
                this.isBottomShow = false
            },
            openInput(){
                this.isBottomShow = true
            },
            onScrollChanged(e){
                this.$refs.tabView.setIndex(e.index)
            }
        },
        data() {
            let url = weex.config.bundleUrl
            let user = decodeURIComponent(utils.getQueryVariable(url, 'user'))
            let repos = decodeURIComponent(utils.getQueryVariable(url, 'repos'))
            return {
                index: 0,
                async closedLoader(page) {
                    let data = await gitee.getPullRequests(user, repos, page, 20, 'closed')
                    let list = []
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        let updateAt = format.format(new Date(item['updated_at']), 'Y年m月d日')
                        let tags = []
                        for (let j = 0; j < item['labels'].length; j++) {
                            let l = item['labels'][j]
                            tags.push({
                                text: l.name,
                                color: "#" + l.color
                            })
                        }

                        list.push({
                            header: require('@/res/solve.png').default,
                            title: "#" + item['number'] + '-' + item['title'],
                            username: item['user']['login'],
                            icon: item['user']['avatar_url'],
                            updateAt: updateAt,
                            tags: tags,
                            comments: item['comments'],
                            url: item['html_url']
                        })
                    }
                    return list
                },
                async openLoader(page) {
                    let data = await gitee.getPullRequests(user, repos, page, 20)
                    let list = []
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        let updateAt = format.format(new Date(item['updated_at']), 'Y年m月d日')
                        let tags = []
                        for (let j = 0; j < item['labels'].length; j++) {
                            let l = item['labels'][j]
                            tags.push({
                                text: l.name,
                                color: "#" + l.color
                            })
                        }

                        list.push({
                            header: require('@/res/issues.png').default,
                            title: "#" + item['number'] + '-' + item['title'],
                            username: item['user']['login'],
                            icon: item['user']['avatar_url'],
                            updateAt: updateAt,
                            tags: tags,
                            comments: item['comments'],
                            url: item['html_url']
                        })
                    }
                    return list
                }
            }
        }
    }
</script>

<style scoped>
    .wrapper{
        flex-direction: column;
        background-color: whitesmoke;
    }

    .bar2 {
        align-items: center;
        justify-content: center;
        flex-direction: row;
        background-color: #FBFBFB;
        padding-top: 10px;
        padding-bottom: 10px;
        border-bottom-width: 0.5px;
        border-bottom-color: #dddddd;
    }

</style>