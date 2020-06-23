<template>
    <div class="head-bar">
        <div class="head-item"
             v-for="(item,index) in items"
             @click="click(index)">
            <text style="font-size: 35px;text-align: center">{{item[1]}}</text>
            <text style="font-size: 25px;text-align: center">{{item[0]}}</text>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            items: {
                type: Array
            }
        },
        methods: {
            click(index) {
                this.$emit('tabClick', {index: index})
            }
        },
        name: "tabs"
    }
</script>

<style scoped>

    .head-bar {
        padding-left: 80px;
        padding-right: 80px;
        background-color: white;
        height: 100px;
        flex-direction: row;
        justify-content: space-between;
    }

    .head-item {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>