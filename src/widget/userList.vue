<template>
    <list>
        <refresh class="refresh"
                 :display="refreshing ? 'show' : 'hide'"
                 @refresh="onRefresh"
                 slot="header">
            <text class="indicator-text">刷新</text>
            <loading-indicator class="indicator">
            </loading-indicator>
        </refresh>
        <cell v-for="(item,index) in items"
              :key="index">
            <user-item
                    :icon="item.icon"
                    :url="item.url"
                    :username="item.username">
            </user-item>
        </cell>
    </list>
</template>

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

<script>
    import UserItem from "@/widget/userItem";

    export default {
        name: "userList",
        components: {
            UserItem
        },
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
        async created() {
            this.items = await this.loadPage()
        },
        data() {
            return {
                items: [],
                page: 1,
                loading: false,
                refreshing: false,
            }
        }
    }
</script>

