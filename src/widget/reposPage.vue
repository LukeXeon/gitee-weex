<template>
    <repos-list
            @loadMore="onLoadMore"
            @onItemClick="onItemClick"
            :items="items">
        <refresh class="refresh"
                 :display="refreshing ? 'show' : 'hide'"
                 @refresh="onRefresh"
                 slot="header">
            <text class="indicator-text">刷新</text>
            <loading-indicator class="indicator">
            </loading-indicator>
        </refresh>
        <wxc-result
                slot="nil"
                type="noNetwork"
                show="true"
                padding-top="232">
        </wxc-result>
    </repos-list>
</template>

<script>
    import reposList from "@/widget/reposList";
    import {WxcResult} from 'weex-ui'
    import utils from "@/libs/utils";

    export default {
        props: {
            model: {
                type: Function
            }
        },
        components: {
            reposList,
            WxcResult
        },
        methods: {
            onItemClick(e) {
                if (e.type === 'repos') {
                    utils.jumpTo('repository', {
                        user: e.user,
                        repos: e.repos
                    })
                }
            },
            async onRefresh() {
                if (!this.loading) {
                    this.refreshing = true
                    try {
                        this.page = 0
                        this.items = await this.loadPage()
                    } finally {
                        this.refreshing = false
                    }
                }
            },
            loadPage(page = 0) {
                return this.model(page)
            },
            async onLoadMore() {
                if (!this.refreshing) {
                    this.loading = true
                    this.page++
                    let data = await this.loadPage(this.page)
                    this.items.push(...data)
                    this.loading = false
                }
            }
        },
        async created() {
            this.items = await this.loadPage()
        },
        data() {
            return {
                page: 1,
                loading: false,
                refreshing: false,
                items: []
            }
        },
        name: "hotPage"
    }
</script>

<style scoped>
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