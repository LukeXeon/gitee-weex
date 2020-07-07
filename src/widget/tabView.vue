<template>
    <div class="bar-wrapper">
        <div class="select-tab-wrapper">
            <div class="select-tab"
                 ref="selectTab">
            </div>
        </div>
        <div class="bar">
            <div v-for="(text,index) in tabs"
                 @click="onSelect(index)"
                 class="tab">
                <text class="text">{{text}}</text>
            </div>
        </div>
    </div>

</template>

<script>
    import utils from "@/libs/utils";

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
                let tab = this.$refs.selectTab
                utils.animate(tab,{
                    styles: {
                        transform: `translateX(${index*190})`,
                        transformOrigin: 'center center'
                    },
                    duration: 200, //ms
                    timingFunction: 'ease',
                    delay: 0 //ms
                })
                this.$emit('select', {
                    index: index
                })
            }
        },
    }
</script>

<style scoped>
    .bar-wrapper{
        background-color: #eaeaea;
        border-radius: 20px;
        flex-direction: column
    }

    .bar {
        flex-direction: row;
    }

    .tab{
        margin: 5px;
        width: 180px;
        height: 50px;
        justify-content: center;
        align-items: center;
    }

    .text{
        text-align: center;
        font-size: 30px;
    }

    .select-tab-wrapper{
        position: absolute;
        left: 0;
        bottom: 0;
        padding: 5px;
    }

    .select-tab {
        transition-property: transform;
        width: 180px;
        height: 50px;
        border-radius: 15px;
        background-color: white;
    }
</style>