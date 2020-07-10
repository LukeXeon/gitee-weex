<template>
    <div class="wrapper" @click="onCellClicked">
        <text class="header">{{title}}</text>
        <text class="content">{{content}}</text>
        <image class="image"
               :src="require('@/res/right.png').default">
        </image>
    </div>
</template>

<script>

    export default {
        name: "label2",
        props: {
            title: String,
            content: String
        },
        methods: {
            onCellClicked() {
                this.$emit('onCellClick')
            }
        }
    }
</script>

<style scoped>
    .wrapper {
        background-color: white;
        height: 80px;
        flex-direction: row;
        align-items: center;
        border-bottom-color:  #dddddd;
        border-bottom-width: 0.5px;
    }

    .header {
        margin-left: 30px;
        font-size: 30px;
        font-weight: bold;
        width: 100px;
        color: #888888;
    }

    .content {
        flex: 1;
        font-size: 30px;
    }

    .image {
        width: 30px;
        height: 30px;
        margin-right: 30px;
    }
</style>