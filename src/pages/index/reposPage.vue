<template>
    <div>
        <wxc-minibar
                :title="title"
                leftButton=""
                text-color="black"
                background-color="#FBFBFB"/>
        <repos-list
                @loadMore="onLoadMore"
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
    </div>
</template>

<script>
    import gitee from "@/libs/gitee";
    import reposList from "@/widget/reposList";
    import {WxcMinibar} from 'weex-ui'

    export default {
        props: {
            model: {
                type: Function()
            },
            title: {
                type: String
            }
        },
        components: {
            WxcMinibar,
            reposList
        },
        methods: {
            async onRefresh() {
                this.refreshing = true
                try {
                    this.page = 1
                    this.items = await this.loadPage()
                } finally {
                    this.refreshing = false
                }
            },
            async loadPage(page = 1) {
                return this.model(page);
            },
            async onLoadMore() {
                let page = this.page
                try {
                    let data = await this.loadPage(page + 1)
                    this.items.push(...data)
                } finally {
                    this.page = page
                }
            }
        },
        async created() {
            this.items = await this.loadPage()
        },
        data() {
            return {
                page: 1,
                refreshing: false,
                items: []
            }
        },
        name: "hot-page"
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