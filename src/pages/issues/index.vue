<template>
    <div class="wrapper">
        <wxc-minibar title="Issues"
                     text-color="black"
                     background-color="#FBFBFB">
            <div slot="left"
                 @click="back"
                 class="left">
                <image :src="require('@/res/back.png').default"
                       style="width: 40px;height: 40px">
                </image>
            </div>
            <div slot="right">
                <image :src="require('@/res/plus.png').default"
                       @click="openInput"
                       class="image">
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
        <wxc-popup popup-color="transparent"
                   :show="isBottomShow"
                   @wxcPopupOverlayClicked="popupOverlayBottomClick"
                   pos="bottom"
                   :height="600">
            <div class="bottom-bar">
                <div class="inner">
                    <text class="title">提交Issue</text>
                    <input ref="input0"
                           placeholder="标题"
                           class="input0"
                           @input="onInput0">
                    <textarea class="input"
                              ref="input"
                              @input="onInput"
                              placeholder="内容"
                              rows="10"/>
                    <div class="button"
                         @click="onSubmit">
                        <text class="button-text">提交</text>
                    </div>
                </div>
            </div>
        </wxc-popup>
        <wxc-loading :show="isLoading"
                     :loadingPic="require('@/res/loading.gif').default"
                     :need-mask="true">
        </wxc-loading>
    </div>
</template>

<script>
    import tabView from "@/widget/tabView";
    import {WxcMinibar,WxcPopup,WxcLoading} from 'weex-ui'
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
            WxcPopup,
            WxcLoading
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
            },
            onInput(e) {
                this.value = e.value
            },
            onInput0(e) {
                this.value0 = e.value
            },
            async onSubmit() {
                let url = weex.config.bundleUrl
                let user = decodeURIComponent(utils.getQueryVariable(url, 'user'))
                let repos = decodeURIComponent(utils.getQueryVariable(url, 'repos'))
                let modal = weex.requireModule('modal')
                this.isLoading = true
                this.$refs.input.blur()
                this.$refs.input0.blur()
                try {
                    if (this.value || this.value.length === 0) {
                        await gitee.saveIssues(
                            user,
                            repos,
                            this.value0,
                            this.value,
                        )
                    } else {
                        throw '内容不能为空'
                    }
                } catch (e) {
                    modal.alert({
                        message: '提交失败，原因为：' + e
                    })
                    return
                } finally {
                    this.isLoading = false
                }
                modal.alert({
                    message: '提交成功'
                }, () => {
                    this.isBottomShow = false
                })
            }
        },
        data() {
            let url = weex.config.bundleUrl
            let user = decodeURIComponent(utils.getQueryVariable(url, 'user'))
            let repos = decodeURIComponent(utils.getQueryVariable(url, 'repos'))
            return {
                isLoading: false,
                value: '',
                value0: '',
                isBottomShow: false,
                index: 0,
                async closedLoader(page) {
                    let data = await gitee.getIssues(user, repos, page, 20, 'closed')
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
                            url:item['html_url']
                        })
                    }
                    return list
                },
                async openLoader(page) {
                    let data = await gitee.getIssues(user, repos, page, 20)
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
                            url:item['html_url']
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

    .bottom-bar {
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
        background-color: white;
        flex: 1;
    }

    .title{
        font-weight: bold;
        font-size: 35px;
    }

    .inner {
        flex-direction: column;
        margin-top: 40px;
        margin-left: 20px;
        margin-right: 20px
    }

    .input0 {
        border-radius: 10px;
        background-color: whitesmoke;
        height: 50px;
        font-size: 30px;
        margin-top: 5px;
        margin-bottom: 10px;
        padding: 10px;
    }

    .input {
        border-radius: 10px;
        background-color: whitesmoke;
        height: 250px;
        font-size: 30px;
        padding: 10px 5px;
    }

    .button{
        height: 80px;
        margin-top: 10px;
        border-radius: 15px;
        justify-content: center;
        align-items: center;
        background-color: #0088fb;
    }

    .button-text{
        color: white;
        font-weight: bold;
        font-size: 35px;
    }

    .image {
        width: 45px;
        height: 45px;
    }
</style>