<template>
    <div class="wrapper">
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
            <div slot="right">
                <image :src="require('@/res/plus.png').default"
                       @click="openInput"
                       class="image">
                </image>
            </div>
        </wxc-minibar>
        <div class="bar2">
            <tab-view @select="onSelect"
                      :tabs="['Open','Closed']">
            </tab-view>
        </div>
        <slider>
        </slider>
        <wxc-popup popup-color="transparent"
                   :show="isBottomShow"
                   @wxcPopupOverlayClicked="popupOverlayBottomClick"
                   pos="bottom"
                   :height="inputHeight">
            <div class="bottom-bar">
            </div>
        </wxc-popup>
    </div>
</template>

<script>
    import tabView from "@/widget/tabView";
    import {WxcMinibar,WxcPopup,Utils} from 'weex-ui'

    export default {
        name: "index",
        components: {
            tabView,
            WxcMinibar,
            WxcPopup
        },
        computed: {
            inputHeight() {
                return Utils.env.getPageHeight() * 0.8;
            }
        },
        methods: {
            onSelect(index) {

            },
            back() {
                const navigator = weex.requireModule('navigator')
                navigator.pop()
            },
            popupOverlayBottomClick(){
                this.isBottomShow = false
            },
            openInput(){
                this.isBottomShow = true
            },
        },
        data() {
            return {
                isBottomShow: false
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
        flex-direction: row;
        background-color: #FBFBFB;
        padding-top: 10px;
        padding-bottom: 10px;
        border-bottom-width: 0.5px;
        border-bottom-color: #dddddd;
    }

    .bottom-bar {
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
        background-color: white;
        flex: 1;
    }

    .image {
        width: 50px;
        height: 50px;
    }
</style>