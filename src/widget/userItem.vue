<template>
    <div class="item">
        <image class="image"
               :src="icon">
        </image>
        <div class="middle">
            <div style="flex-direction: row;align-items: center">
                <text class="username" style="color: #238FFF;">{{username}}</text>
                <text class="username" style="color: #3f3f3f;"> ({{nikeName}})</text>
            </div>
            <text class="url">{{url}}</text>
        </div>
        <div :class="['button',isFollow?'button-follow':'button-unfollow']"
             @click="onClick">
            <text :class="['text',isFollow?'text-follow':'text-unfollow']">{{isFollow?'Unfollow':'Follow'}}</text>
        </div>
    </div>
</template>

<style scoped>
    .item {
        margin: 20px 20px 20px 30px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .image{
        width: 80px;
        height: 80px;
        border-radius: 5px;
    }

    .button {
        border-radius: 30px;
        width: 160px;
        height: 55px;
        justify-content: center;
        align-items: center;
    }

    .text{
        font-size: 30px;
        font-weight: bold;
    }

    .text-follow{
        color: white;
    }

    .text-unfollow{
        color: #238FFF;
    }

    .button-follow{
        background-color: #238FFF;
    }

    .button-unfollow{
        background-color: #f1f1f1;
    }

    .middle {
        flex: 1;
        flex-direction: column;
        margin-left: 15px;
        margin-right: 15px;
    }

    .username{
        max-width: 250px;
        font-size: 30px;
        font-weight: bold;
        text-overflow: ellipsis;
        lines: 1
    }

    .url {
        font-size: 28px;
        text-overflow: ellipsis;
        lines: 1
    }

</style>

<script>
    import gitee from "@/libs/gitee";

    export default {
        name: "userItem",
        props: {
            username: String,
            nikeName: String,
            url: String,
            icon: String,
        },
        methods: {
            async onClick() {
                if (this.isFollow) {
                    await gitee.cancelFollowing(this.username)
                    this.isFollow = false
                } else {
                    await gitee.following(this.username)
                    this.isFollow = true
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

