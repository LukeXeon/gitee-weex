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

    </repos-list>
</template>

<script>
    import reposList from "@/widget/reposList";
    import utils from "@/libs/utils";

    export default {
        props: {
            model: {
                type: Function
            }
        },
        components: {
            reposList
        },
        methods: {
            onItemClick(e) {
                if (e.type === 'repos') {
                    utils.jumpTo('repository', {
                        user: e.item.username,
                        repos: e.item.repos,
                        branch: e.item.branch,
                        icon: e.item.icon
                    })
                } else if (e.type === 'owner') {
                    switch (e.item.type) {
                        case "group": {
                            utils.jumpTo('organization', {
                                path: e.item.username
                            })
                        }
                            break
                        case "personal": {
                            utils.jumpTo('user', {
                                path: e.item.username
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
                }
            },
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
            loadPage(page = 1) {
                return this.model(page)
            },
            async onLoadMore() {
                if (!this.refreshing) {
                    this.loading = true
                    let data = await this.loadPage(++this.page)
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