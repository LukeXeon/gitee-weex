<template>
    <list alwaysScrollableVertical="true"
          @loadmore="onLoadMore">
        <refresh class="refresh"
                 :display="refreshing ? 'show' : 'hide'"
                 @refresh="onRefresh"
                 slot="header">
            <text class="indicator-text">刷新</text>
            <loading-indicator
                    class="indicator">
            </loading-indicator>
        </refresh>
        <cell v-for="(item,index) in items"
              @click="onClick(item.url)"
              class="cell">
            <div class="line1">
                <image class="image"
                       :src="item.header">
                </image>
                <text class="title-text">{{item.title}}</text>
            </div>
            <scroller class="line2"
                      v-if="item.tags&&item.tags.length>0"
                      show-scrollbar="false"
                      scroll-direction="horizontal">
                <div style="flex-direction: row">
                    <div v-for="(tag,index2) in item.tags"
                         class="tag"
                         :style="{'background-color':tag.color}">
                        <text style="color: white;font-size: 28px">{{tag.text}}</text>
                    </div>
                </div>
            </scroller>
            <div class="line3">
                <div style="flex-direction: row;flex: 1;align-items: center"
                     @click="onClickUser(item.username)">
                    <image class="icon"
                           :src="item.icon">
                    </image>
                    <div style="flex: 1">
                        <text class="username">{{item.username}}</text>
                    </div>
                </div>
                <text style="font-size: 28px">{{item.updateAt}}</text>
                <image class="comments-icon"
                       :src="require('@/res/comments.png').default">
                </image>
                <text class="comments-count">{{item.comments}}</text>
            </div>
        </cell>
        <cell v-if="isDisplayEmpty"
              style="flex-direction: column;align-items: center;width: 750px">
            <text class="empty-text">这里什么也没有，下拉刷新试试</text>
            <image class="empty-image"
                   :src="require('@/res/empty.png').default">
            </image>
        </cell>
    </list>
</template>

<script>

    import utils from "@/libs/utils";

    export default {
        name: "issuesPage",
        props: {
            model: {
                type: Function
            },
        },
        computed: {
            isDisplayEmpty() {
                return (!this.items || this.items.length === 0)
            }
        },
        methods: {
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
            },
            loadPage(page = 1) {
                return this.model(page)
            },
            onClick(url) {
                utils.jumpTo('webview', {
                    url: url
                })
            },
            onClickUser(user) {
                utils.jumpTo('user', {
                    path: user
                })
            }
        },
        async created() {
            this.items = await this.loadPage()
        },
        data() {
            return {
                refreshing: false,
                loading: false,
                items: [],
                page: 1
            }
        }
    }
</script>

<style scoped>
    .refresh {
        width: 750px;
        display: -ms-flex;
        display: -webkit-flex;
        display: flex;
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

    .cell {
        width: 750px;
        border-bottom-width: 0.5px;
        border-bottom-color: #dddddd;
        background-color: white;
        flex-direction: column;
    }

    .tag {
        padding-left: 15px;
        padding-right: 15px;
        padding-top: 2px;
        padding-bottom: 2px;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        border-radius: 5px;
        height: 40px;
    }

    .title-text{
        color: #0088fb;
        font-weight: bold;
        margin-left: 20px;
        font-size: 30px;
        width: 640px;
    }

    .line1 {
        margin-top: 25px;
        margin-bottom: 5px;
        flex-direction: row;
    }

    .line2 {
        flex: 1;
        width: 640px;
        margin-left: 90px;
        margin-top: 5px;
        margin-bottom: 5px;
        height: 40px;
    }

    .line3 {
        margin-left: 90px;
        margin-top: 5px;
        margin-bottom: 25px;
        flex-direction: row;
        align-items: center;
    }

    .image {
        width: 40px;
        height: 40px;
        margin-left: 30px;
    }

    .icon {
        border-radius: 5px;
        width: 40px;
        height: 40px;
    }

    .comments-icon {
        width: 30px;
        height: 30px;
        margin-left: 5px;
        margin-right: 5px;
    }

    .comments-count {
        text-align: right;
        font-size: 28px;
        margin-right: 25px;
        width: 20px;
    }

    .username {
        margin-left: 10px;
        font-size: 28px;
    }

    .empty-text {
        font-size: 30px;
        margin-top: 30px;
        text-align: center
    }

    .empty-image {
        width: 200px;
        height: 200px
    }
</style>