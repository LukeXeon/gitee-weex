<template>
    <list @loadmore="onLoadMore">
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
              class="cell">
            <div class="line1">
                <image class="image"
                       :src="require('@/res/issues.png').default">
                </image>
                <text style="font-size: 30px">
                </text>
            </div>
            <scroller class="line2"
                      show-scrollbar="false"
                      scroll-direction="horizontal">
                <div v-for="(tag,index2) in item.tabs">
                    <text style="font-size: 30px"></text>
                    <image style="width: 30px;height: 30px">
                    </image>
                </div>
            </scroller>
            <div class="line3">
                <image class="icon">
                </image>
                <div style="flex: 1">
                    <text class="username"></text>
                </div>
                <text style="font-size: 30px"></text>
                <image class="icon">
                </image>
                <text style="font-size: 30px"></text>
            </div>
        </cell>
    </list>
</template>

<script>
    export default {
        name: "issuesPage",
        props: {
            model: {
                type: Function
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
        },
        data() {
            return {
                refreshing: false,
                loading: false,
                items: [],
                page: 0
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
        border-bottom-width: 1px;
        border-bottom-color: whitesmoke;
        background-color: white;
        flex-direction: column;
    }

    .line1 {
        flex-direction: row;
    }

    .line2 {

    }

    .line3 {
        flex-direction: column;
        align-items: center;
    }

    .image {
        width: 40px;
        height: 40px;
        margin-left: 30px;
    }

    .icon {
        width: 40px;
        height: 40px;
    }

    .username {
        font-size: 30px;
    }
</style>