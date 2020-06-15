<template>
    <div style="flex: 1">
        <wxc-minibar title="我的star"
                     leftButton=""
                     text-color="black"
                     background-color="#FBFBFB"/>
        <repos-list :items="items">
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

<script>
    import {WxcMinibar} from 'weex-ui'
    import reposList from "@/widget/reposList";
    import gitee from "@/libs/gitee";
    import utils from "@/libs/utils";

    export default {
        components: {
            WxcMinibar,
            reposList
        },
        name: "star",
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
                let data = await gitee.getStars(0, 20)
                let list = []
                for (let i = 0; i < data.length; i++) {
                    let item = data[i]
                    list.push([
                        item['owner']['avatar_url'],
                        item['owner']['login'],
                        item['name'],
                        item['description'],
                        item['updated_at'],
                        "color",
                        item['language'],
                        item['stargazers_count'],
                        item['forks_count']
                    ])
                }
                this.items = list
            }
        },
        async created() {
            await this.doRefresh();
        },
        data() {
            return {
                refreshing: false,
                items: [
                    // 0        1            2       3             4           5       6       7        8
                    //["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                ]
            }
        }
    }
</script>
