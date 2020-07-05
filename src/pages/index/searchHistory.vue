<template>
    <list class="list">
        <header class="header">
            <div class="header2">
                <text class="header-text">搜索历史</text>
                <image @click="onClear"
                       style="width: 50px;height: 50px;"
                       :src="require('@/res/clean.png').default">
                </image>
            </div>
            <div class="line"></div>
        </header>
        <cell v-for="(text,index) in historyItems"
              :key="index"
              @click="onItemClick(text)">
            <div class="item">
                <text style="font-size: 32px">{{text}}</text>
            </div>
        </cell>
    </list>
</template>

<style scoped>
    .header {
        background-color: white;
        flex-direction: column;
        width: 750px;
        border-top-width: 0.5px;
        border-top-color: #dddddd;
    }

    .header-text {
        font-size: 28px;
        font-weight: bold;
    }

    .header2 {
        flex: 1;
        background-color: white;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 10px 15px 10px 25px;
    }

    .list {
        flex: 1;
        background-color: whitesmoke;
    }

    .item {
        flex: 1;
        background-color: white;
        padding-left: 25px;
        padding-right: 20px;
        border-top-width: 0.5px;
        border-top-color: #dddddd;
        border-bottom-width: 0.5px;
        border-bottom-color: #dddddd;
        width: 750px;
        height: 70px;
        justify-content: center;
    }

    .line {
        background-color: #f3f3f3;
        height: 0.5px
    }
</style>

<script>
    import utils from "@/libs/utils";

    export default {
        name: "searchHistory",
        methods: {
            onClear() {
                let modal = weex.requireModule('modal')
                modal.confirm({
                    message: '操作不可恢复，确定需要清除吗？',
                    okTitle: '确认',
                    cancelTitle: '取消'
                }, async (op) => {
                    if (op === '确认') {
                        this.historyItems = []
                        await utils.removeKey('search_history')
                    }
                })
            },
            onItemClick(text) {
                this.$emit('textSelected', {text: text})
            }
        },
        async created() {
            let text = await utils.getValue('search_history')
            let list
            try {
                list = JSON.parse(text)
            } catch (e) {
                await utils.removeKey('search_history')
                list = []
            }
            this.historyItems = list
        },
        data() {
            return {
                historyItems: []
            }
        }
    }
</script>

