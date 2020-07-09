<template>
    <div class="bar-wrapper">
        <div class="select-tab-wrapper">
            <div class="select-tab"
                 ref="selectTab">
            </div>
        </div>
        <div class="bar">
            <div v-for="(text,index) in tabs"
                 @click="setIndex(index)"
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
            setIndex(index) {
                this.index = index
            },
        },
        watch: {
            index(newValue, oldValue) {
                if (oldValue !== newValue) {
                    let tab = this.$refs.selectTab
                    utils.animate(tab, {
                        styles: {
                            transform: `translateX(${newValue * 190})`,
                            transformOrigin: 'center center'
                        },
                        duration: 200, //ms
                        timingFunction: 'ease',
                        delay: 0 //ms
                    })
                    this.$emit('select', {
                        index: value
                    })
                }
            }
        },
        data() {
            return {
                index: 0
            }
        }
    }
</script>

<style scoped>
    .bar-wrapper {
        background-color: #eaeaea;
        border-radius: 20px;
        flex-direction: column
    }

    .bar {
        flex-direction: row;
    }

    .tab {
        margin: 5px;
        width: 180px;
        height: 50px;
        justify-content: center;
        align-items: center;
    }

    .text {
        text-align: center;
        font-size: 30px;
    }

    .select-tab-wrapper {
        position: absolute;
        left: 0;
        bottom: 0;
        padding: 5px;
    }

    .select-tab {
        border-color: #dddddd;
        border-width: 0.5px;
        transition-property: transform;
        width: 180px;
        height: 50px;
        border-radius: 15px;
        background-color: white;
    }
</style>