<template>
    <div class="bar">
        <div v-for="(text,index) in tabs" style="flex: 1">
            <div class="select-item" v-if="index===activeTab" key="tab">
                <text class="item">{{text}}</text>
            </div>
            <div v-else class="unselect-item" @click="onSelect(index)">
                <text class="item">{{text}}</text>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            tabs: {
                type: Array,
                default: () => ([])
            },
        },
        name: "tabView",
        methods: {
            onSelect(index) {
                this.activeTab = index;
                this.$emit('select', {
                    index: index
                })
            }
        },
        data() {
            return {
                activeTab: 0
            }
        }
    }
</script>

<style scoped>
    .bar {
        flex-direction: row;
        background-color: #eaeaea;
        border-radius: 20px;
    }

    .select-item {
        justify-content: center;
        align-items: center;
        flex: 1;
        border-width: 0.5px;
        border-color: #dddddd;
        border-radius: 15px;
        background-color: white;
        margin: 5px;
    }

    .unselect-item {
        justify-content: center;
        align-items: center;
        flex: 1;
        margin: 5px;
    }

    .item {
        text-align: center;
        font-size: 32px;
        flex: 1;
        justify-content: center;
        align-items: center;
    }
</style>