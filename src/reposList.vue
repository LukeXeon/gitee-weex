<template>
    <recycle-list for="(item,index) in list">
        <cell-slot>
            <div class="item">
                <div class="line1">
                    <image class="icon">
                    </image>
                    <div style="flex-direction: row">
                        <text class="title-text" style="margin-left: 20px;">{{item[1+2]}}</text>
                        <text class="title-text"> / </text>
                        <text class="title-text">{{item[2+2]}}</text>
                    </div>
                </div>
                <text class="distribute">{{item[3+2]}}</text>
                <div class="tags-line">
                    <div class="tag">
                        <div style="width: 30px;height: 30px;border-radius: 30px;background-color: #238FFF"></div>
                        <text style="font-size: 30px;margin-left: 10px">{{item[6+2]}}</text>
                    </div>
                    <div class="tag">
                        <image style="width: 30px;height: 30px;" v-bind:src="item[0]">
                        </image>
                        <text style="font-size: 30px;margin-left: 10px">{{(item[7+2])}}</text>
                    </div>
                    <div class="tag">
                        <image style="width: 30px;height: 30px;" v-bind:src="item[1]">
                        </image>
                        <text style="font-size: 30px;margin-left: 10px">{{item[8+2]}}</text>
                    </div>
                </div>
            </div>
        </cell-slot>
    </recycle-list>
</template>


<script>
    // 0        1            2       3             4           5       6       7        8
    //["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
    let star = require('@/res/star.png').default
    let branch = require('@/res/branch.png').default
    export default {
        props: {
            items: {
                type: Array,
                default: () => ([])
            }
        },
        name: "reposList",
        data() {
            let list = [];
            for (let i = 0; i < this.items.length; i++) {
                let item = [star, branch]
                item.push(...this.items[i].slice())
                list.push(item)
            }
            return {
                list: list
            }
        }
    }
</script>

<style scoped>
    .item {
        flex-direction: column;
        background-color: white;
        border-bottom-width: 0.5px;
        border-bottom-color: #dddddd;
    }

    .distribute {
        margin-left: 100px;
        font-size: 30px;
        lines: 5;
        text-overflow: ellipsis
    }

    .tags-line {
        margin: 10px 60px 10px 100px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between
    }

    .line1 {
        flex-direction: row;
        margin-top: 30px;
        align-items: center;
        margin-bottom: 5px
    }

    .tag {
        flex-direction: row;
        align-items: center;
    }

    .title-text {
        font-size: 35px
    }

    .icon {
        height: 50px;
        width: 50px;
        margin-left: 30px;
        background-color: #238FFF;
        border-radius: 5px
    }
</style>