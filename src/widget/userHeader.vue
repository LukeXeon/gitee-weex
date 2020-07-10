<template>
    <div class="head-bar" @click="onClick">
        <image class="head-icon" :src="avatarIcon">
        </image>
        <div class="text-group">
            <div style="flex-direction: row;align-items: center">
                <text class="username" v-if="username&&username!==''">{{username}}</text>
                <text class="text" v-if="nikeName&&nikeName!==''"> (</text>
                <text class="nikeName" v-if="nikeName&&nikeName!==''">{{nikeName}}</text>
                <text class="text" v-if="nikeName&&nikeName!==''">)</text>
            </div>
            <text class="bio">{{bio&&bio!==''?bio:'暂无描述'}}</text>
            <text style="font-size: 26px;" v-if="joinTime&&joinTime!==''">于{{joinTime}}加入</text>
            <div v-else style="height: 26px"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "userHeader",
        props: {
            avatarIcon: String,
            username: String,
            nikeName: String,
            bio: String,
            joinTime: String
        },
        methods: {
            onClick() {
                this.$emit('onHeaderClick')
            }
        }
    }
</script>

<style scoped>
    .bio {
        font-size: 32px;
        max-width: 550px;
        text-overflow: ellipsis;
        lines: 1
    }

    .head-icon {
        border-width: 0.5px;
        border-color: whitesmoke;
        height: 120px;
        width: 120px;
        margin-left: 30px;
        border-radius: 10px
    }

    .head-bar {
        flex-direction: row;
        background-color: white;
        height: 170px;
        border-bottom-width: 0.5px;
        align-items: center;
        border-bottom-color: #dddddd
    }

    .text-group {
        justify-content: space-between;
        height: 130px;
        flex-direction: column;
        margin-left: 20px
    }

    .username {
        lines: 1;
        text-overflow: ellipsis;
        max-width: 260px;
        font-size: 32px;
        color: #00B4FF;
        font-weight: bold
    }

    .text {
        font-size: 32px;
        font-weight: bold
    }

    .nikeName {
        lines: 1;
        text-overflow: ellipsis;
        max-width: 260px;
        font-size: 32px;
        font-weight: bold
    }
</style>