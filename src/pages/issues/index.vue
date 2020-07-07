<template>
    <div style="flex-direction: column">
        <wxc-minibar title="反馈"
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
                      :tabs="['Open','Closed']">
            </tab-view>
        </div>
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

            },
            back() {
                const navigator = weex.requireModule('navigator')
                navigator.pop()
            },
        }
    }
</script>

<style scoped>
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