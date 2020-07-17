<template>
    <div class="bottom-window">
        <div class="item" v-for="(item,index) in buttons">
            <image class="item-icon"
                   :src="item.icon">
            </image>
            <text class="item-text">{{item.text}}</text>
        </div>
    </div>
</template>

<script>
    export default {
        name: "buttonWindow",
        props: {
            user: String,
            repos: String
        },
        data() {
            return {
                buttons: [
                    {
                        text: 'Watch'
                    },
                    {
                        text: 'Fork'
                    },
                    {
                        text: 'Wiki'
                    },
                    {
                        text: 'Commits'
                    },
                    {
                        text: 'Releases'
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .bottom-window {
        flex: 1;
        background-color: white;
        border-radius: 30px;
        margin: 20px;
        flex-direction: row;
        align-items: center;
        padding-left: 10px;
        padding-right: 10px;
    }

    .item{
        justify-content: center;
        flex-direction: column;
        align-items: center;
        flex: 1;
    }

    .item-icon{
        width: 80px;
        height: 80px;
        background-color: #0088fb;
    }

    .item-text{
        margin-top: 5px;
        font-size: 28px;
        text-align: center;
    }
</style>