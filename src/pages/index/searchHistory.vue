<template>
    <list class="list">
        <header class="header">
            <div class="header2">
                <text style="font-size: 32px">搜索历史</text>
                <image style="width: 50px;height: 50px;"
                       :src="require('@/res/clean.png').default">
                </image>
            </div>
            <div class="line"></div>
        </header>
        <cell v-for="(text,index) in historyItems"
              :key="index">
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
        async created() {
            let text = await utils.getValue('search_history')
            if (text) {
                this.historyItems = JSON.parse(text)
            }
        },
        data() {
            return {
                historyItems: []
            }
        }
    }
</script>

