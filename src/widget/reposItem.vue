<template>
    <div class="item" @click="onItemClick('repos',item[1],item[9])">
        <div class="line1">
            <image class="icon" :src="item[0]">
            </image>
            <div style="flex-direction: row;margin-left: 20px;height: 50px;width: 600px">
                <text class="title-text" @click="onItemClick('user',item[1],item[9])">{{item[1]}}</text>
                <text class="title-text">{{char}}</text>
                <text class="title-text" @click="onItemClick('repos',item[1],item[9])">{{item[2]}}</text>
            </div>
        </div>
        <text class="distribute">{{item[3]}}</text>
        <div class="tags-line">
            <div class="tag">
                <div class="lang-tag" :style="{'background-color':item[5]}"></div>
                <text style="font-size: 30px;margin-left: 10px;">{{item[6]}}</text>
            </div>
            <div class="tag" style="justify-content: center">
                <image style="width: 30px;height: 30px;" :src="starIcon">
                </image>
                <text style="font-size: 30px;margin-left: 10px">{{(item[7])}}</text>
            </div>
            <div class="tag" style="justify-content: flex-end">
                <image style="width: 30px;height: 30px;" :src="branchIcon">
                </image>
                <text style="font-size: 30px;margin-left: 10px">{{item[8]}}</text>
            </div>
        </div>
    </div>
</template>

<script>
    // 0        1            2       3             4           5       6       7        8
    //["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
    let star = require('@/res/star.png').default
    let branch = require('@/res/branch.png').default
    export default {
        props: {
            item: {
                type: Array,
            },
        },
        name: "reposItem",
        methods: {
            onItemClick(type, user, repos) {
                this.$emit('onItemClick', {
                    type: type,
                    user: user,
                    repos: repos
                })
            }
        },
        data() {
            return {
                char: " / ",
                starIcon: star,
                branchIcon: branch
            }
        }
    }
</script>

<style scoped>
    .lang-tag {
        width: 25px;
        height: 25px;
        border-radius: 30px;
        background-color: #238FFF
    }

    .item {
        flex-direction: column;
        background-color: white;
        border-bottom-width: 0.5px;
        border-bottom-color: #dddddd;
    }

    .distribute {
        width: 600px;
        margin-left: 100px;
        font-size: 30px;
        lines: 5;
        text-overflow: ellipsis
    }

    .tags-line {
        margin: 10px 60px 10px 100px;
        flex-direction: row;
        align-items: center;
    }

    .line1 {
        width: 750px;
        flex-direction: row;
        margin-top: 30px;
        align-items: center;
        margin-bottom: 5px
    }

    .tag {
        flex: 1;
        flex-direction: row;
        align-items: center;
    }

    .title-text {
        flex: 0;
        max-width: 300px;
        color: #238FFF;
        lines: 1;
        text-align: left;
        font-size: 35px;
        text-overflow: ellipsis
    }

    .icon {
        height: 50px;
        width: 50px;
        margin-left: 30px;
        border-radius: 5px
    }
</style>