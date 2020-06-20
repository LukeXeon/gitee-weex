<template>
    <wxc-mask :width="width"
              :height="height"
              aria-hidden="true"
              mask-bg-color="transparent"
              overlay-opacity="0.8"
              :show="show"
              :opacity='opacity'
              :show-close="false"
              @wxcMaskSetHidden="maskOverlayClick">
        <div class="card"
             :style="{'background-color':blackMode?'black':'white'}">
            <div class="header">
                <div style="width: 55px"/>
                <text class="text"
                      :style="{'color':!blackMode?'black':'white'}">{{title}}</text>
                <div class="switch"
                     :style="{'background-color':!blackMode?'black':'white'}"
                     @click="onSwitch"></div>
            </div>
            <div v-if="show"
                 class="image-wrapper">
                <image :src="url"
                       style="height: 550px;width: 550px">
                </image>
            </div>
        </div>
    </wxc-mask>
</template>

<style scoped>
    .header {
        width: 540px;
        align-items: center;
        flex-direction: row;
        margin-top: 30px;
        margin-bottom: 10px;
        justify-content: space-between;
    }

    .switch {
        justify-self: flex-end;
        border-radius: 55px;
        background-color: black;
        width: 55px;
        height: 55px;
    }

    .text {
        justify-self: center;
        font-size: 40px;
    }

    .card {
        align-self: center;
        align-items: center;
        background-color: white;
        border-radius: 30px;
        flex-direction: column;
        width: 600px;
    }

    .image-wrapper {
        align-items: center;
        justify-content: center;
        width: 600px;
        height: 600px;
    }
</style>


<script>
    import {WxcMask} from 'weex-ui'

    export default {
        components: {
            WxcMask
        },
        watch: {
            url() {
                this.blackMode = false
            }
        },
        props: {
            title: String,
            show: {
                type: Boolean,
                default: false
            },
            url: String,
            opacity: {
                type: [Number, String],
                default: 0.6
            }
        },
        methods: {
            onSwitch() {
                this.blackMode = !this.blackMode
            },
            maskOverlayClick() {
                this.$emit('onOverlayClicked', {});
            }
        },
        data() {
            return {
                blackMode: false
            }
        }
    };
</script>
