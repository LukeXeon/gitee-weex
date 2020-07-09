<template>
    <div class="wrapper">
        <wxc-minibar title="Pull Requests"
                     text-color="black"
                     background-color="#FBFBFB">
            <div slot="left"
                 @click="back"
                 class="left">
                <image :src="require('@/res/back.png').default"
                       style="width: 40px;height: 40px">
                </image>
            </div>
        </wxc-minibar>
        <div class="bar2">
            <tab-view @select="onSelect"
                      ref="tabView"
                      :tabs="['Open','Closed']">
            </tab-view>
        </div>
        <slider style="flex: 1"
                @change="onScrollChanged"
                :index="index">
        </slider>
    </div>
</template>

<script>
    import tabView from "@/widget/tabView";
    import {WxcMinibar} from 'weex-ui'

    export default {
        name: "index",
        components: {
            tabView,
            WxcMinibar
        },
        methods: {
            onSelect(index) {
                this.index = index
            },
            back() {
                const navigator = weex.requireModule('navigator')
                navigator.pop()
            },
            onScrollChanged(e) {
                this.$refs.tabView.setIndex(e.index)
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
    .wrapper{
        flex-direction: column;
        background-color: whitesmoke;
    }

    .bar2 {
        align-items: center;
        justify-content: center;
        background-color: #FBFBFB;
        padding-top: 10px;
        padding-bottom: 10px;
        border-bottom-width: 0.5px;
        border-bottom-color: #dddddd;
    }
</style>