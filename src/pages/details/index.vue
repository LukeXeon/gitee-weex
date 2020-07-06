<template>
    <div style="background-color: whitesmoke">
        <wxc-minibar :title="title"
                     text-color="black"
                     class="top-bar"
                     background-color="#FBFBFB">
            <div slot="left"
                 @click="back"
                 style="width: 60px;height: 60px;justify-content: center;align-items: center">
                <image :src="require('@/res/back.png').default"
                       style="width: 40px;height: 40px">
                </image>
            </div>
        </wxc-minibar>
        <scroller ref="scrollerHead"
                  class="tab-cell" scroll-direction="horizontal">
            <div class="head-tabs">
                <div class="tab"
                     v-for="(tab, t) in tabs"
                     :key="t"
                     :ref="'item' + t">
                    <text class="tab-title">{{tab.title}}</text>
                </div>
                <div class="divider-select"
                     :style="dividerStyle">
                    <div class="select-line"></div>
                </div>
            </div>
        </scroller>
        <slider>

        </slider>
    </div>
</template>

<style scoped>
    .top-bar {
        border-bottom-color: #888888;
        border-bottom-width: 0.5px;
    }

    .tab-cell {
        flex-direction: row;
        justify-content: stretch;
        background-color: #f51438;
        height: 120px;
        max-height:120px;
    }

    .head-tabs{
        flex-direction: row;
        position:relative;
    }

    .tab-title {
        font-size: 28px;
        color: #FFF;
        margin-top: 10px;
    }

    .divider-select{
        width:150px;
        position:absolute;
        left:0;
        bottom:0;
        transition-property:transform;
    }

    .select-line{
        height:8px;
        background-color: yellow;
    }
</style>

<script>
    import {WxcMinibar} from 'weex-ui'

    export default {
        name: "index",
        components: {
            WxcMinibar
        },
        methods: {
            back() {
                const navigator = weex.requireModule('navigator')
                navigator.pop()
            }
        },
        async created() {

        },
        data() {
            return {
                title: '',
                dividerStyle: {
                    transform: "",
                },
                tabs: ['仓库', '关注中', '关注者', 'Star的仓库', 'Watch的仓库']
            }
        }
    }
</script>
