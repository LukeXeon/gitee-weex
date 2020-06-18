<template>
    <div class="item" @click="onLabelClick">
        <div class="icon-wrapper" :style="iconStyle">
            <image class="item-icon" :src="icon">
            </image>
        </div>
        <text class="left-text">{{title}}</text>
        <text v-if="useRight&&rightText!=null" class="text2">{{rightText}}</text>
        <image v-if="useRight"
               class="right-icon"
               :src="rightIcon">
        </image>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String
            },
            rightText: {
                type: String,
                default: null
            },
            icon: {
                type: String
            },
            iconStyle: {
                type: Object
            },
            useRight: {
                type: Boolean,
                default: true
            },
            rightIcon: {
                type: String,
                default: (require('@/res/right.png').default)
            }
        },
        methods: {
            onLabelClick() {
                this.$emit('onLabelClick')
            }
        },
        name: "LabelLine",
    }
</script>

<style scoped>
    .icon-wrapper {
        margin-left: 30px;
        width: 45px;
        height: 45px;
        border-radius: 5px;
    }

    .item-icon {
        flex: 1;
    }

    .item {
        border-width: 0.5px;
        border-color: #dddddd;
        background-color: white;
        align-items: center;
        height: 80px;
        flex-direction: row
    }

    .left-text {
        lines: 1;
        margin-left: 15px;
        font-size: 32px;
        flex: 1
    }

    .right-icon {
        height: 30px;
        width: 30px;
        margin-right: 30px
    }

    .text2 {
        font-size: 32px;
        lines: 1;
        margin-right: 10px
    }
</style>