<template>
    <div class="item">
        <image class="image"
               :src="icon">
        </image>
        <div class="middle">
            <text class="username">{{username}}</text>
            <text class="url">{{url}}</text>
        </div>
        <div :class="['button',isFollow?'button-follow':'button-unfollow']"
             @click="onClick">
            <text :class="['text',isFollow?'text-follow':'text-unfollow']">{{isFollow?'Follow':'Unfollow'}}</text>
        </div>
    </div>
</template>

<style scoped>
    .item{
        margin: 20px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .image{
        width: 40px;
        height: 40px;
        border-width: 10px;
    }

    .button {
        border-width: 30px;
        width: 120px;
        height: 40px;
        justify-content: center;
        align-items: center;
    }

    .text{
        font-size: 40px;
        font-weight: bold;
    }

    .text-follow{
        color: white;
    }

    .text-unfollow{
        color: #238FFF;
    }

    .button-follow{
        background-color: #dddddd;
    }

    .button-unfollow{
        background-color: #238FFF;
    }

    .middle{
        flex: 1;
        flex-direction: column;
    }

    .username{
        font-size: 40px;
        font-weight: bold;
        color: #238FFF;
    }

    .url{
        font-size: 30px;
    }

</style>

<script>
    import gitee from "@/libs/gitee";

    export default {
        name: "userItem",
        props: {
            username: String,
            url: String,
            icon: String
        },
        methods: {
            async onClick() {
                if (this.isFollow) {
                    await gitee.following(this.username)
                } else {
                    await gitee.cancelFollowing(this.username)
                }
            }
        },
        async created() {
            this.isFollow = await gitee.checkFollow(this.username)
        },
        data() {
            return {
                isFollow: false,
            }
        }
    }
</script>

