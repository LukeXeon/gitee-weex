<template>
    <div style="width: 750px;">
        <wxc-minibar
                :title="title"
                leftButton=""
                text-color="black"
                background-color="#FBFBFB"/>
        <repos-list
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
                type: Function
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
                    await this.doRefresh()
                } finally {
                    this.refreshing = false
                }
            },
            async doRefresh() {
                let loadLanguageTask = gitee.loadLanguages()
                let loadTask = this.model()
                let data = await loadTask
                let language = await loadLanguageTask;

                function load(items) {
                    let list = []
                    for (let j = 0; j < items.length; j++) {
                        let item = items[j]
                        list.push([
                            item['owner']['new_portrait'],
                            item['owner']['username'],
                            item['name'],
                            item['description'],
                            item['last_push_at'],
                            "color",
                            item['language'],
                            item['stars_count'],
                            item['forks_count']
                        ])
                    }
                    return list
                }

                this.items = await load(data)
            }
        },
        async created() {
            await this.doRefresh();
        },
        data() {
            return {
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