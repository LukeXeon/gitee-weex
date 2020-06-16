<template>
    <div class="list"
         ref="list"
         :style="extendStyle">
        <wxc-searchbar ref="searchbar"
                       :autofocus="false"
                       :alwaysShowCancel="true"
                       :placeholder="placeholder"
                       @wxcSearchbarInputOnInput="onInput"
                       @wxcSearchbarInputReturned="onSubmit"
                       @wxcSearchbarCancelClicked="onCancel">
        </wxc-searchbar>

        <wxc-indexlist :normal-list="normalList"
                       :nav-style="{ top: '24px'}"
                       :height="listHeight"
                       :show-index="true"
                       :only-show-list="onlyShowList"
                       :city-location-config="currentConfig"
                       @wxcIndexlistItemClicked="onItemClick">
        </wxc-indexlist>

        <wxc-result type="noNetwork"
                    :wrap-style="{top:'84px'}"
                    :show="true"
                    :customSet="result"
                    v-if="showError">
        </wxc-result>
    </div>
</template>

<script>

    import {WxcIndexlist, WxcResult, WxcSearchbar, Utils} from 'weex-ui'

    export default {
        components: {
            WxcSearchbar,
            WxcResult,
            WxcIndexlist
        },
        props: {
            placeholder: {
                type: String
            },
            animationType: {
                type: String,
                default: 'push'
            },
            current: {
                type: String
            },
        },
        data: () => ({
            tId: null,
            onlyShowList: false,
            result: {
                noNetwork: {
                    pic: (require('./res/unhappy.png').default),
                    button: '',
                    content: '搜索无结果'
                }
            }
        }),
        computed: {
            extendStyle: () => (Utils.uiStyle.pageTransitionAnimationStyle(this.animationType)),
            currentConfig() {

            },
            normalList() {

            },
            showError: () => (this.normalList && this.normalList.length < 1),
            listHeight: () => (Utils.env.getPageHeight() - 84),
        },
        methods: {
            onItemClick(e) {
                this.$refs.searchbar.autoBlur();
                this.show(false);
                this.$emit('wxcCityItemSelected', {item: e.item});
            },
            onInput(e) {
                clearTimeout(this.tId);
                if (value !== '') {
                    this.onlyShowList = true;
                } else {

                    this.onlyShowList = false;
                }
                this.tId = setTimeout(() => {
                    this.$emit('OnInput', {
                        value: e.value
                    });
                }, 300);
            },
            onCancel() {
                this.autoBlur();
                this.show(false);
                this.$emit('canceled', {});
            },
            onSubmit(e) {
                this.autoBlur();
                this.$emit('onKeyUpEnter', {value: e.value});
            },
            autoBlur() {
                const inputRef = this.$refs.searchbar;
                inputRef && inputRef.autoBlur();
            },
            show(status = true, callback = null) {
                const ref = this.$refs.city
                if (this.animationType === 'push') {
                    Utils.animation.pageTransitionAnimation(
                        ref,
                        `translateX(${status ? -750 : 750}px)`,
                        status,
                        callback
                    )
                } else if (this.animationType === 'model') {
                    Utils.animation.pageTransitionAnimation(
                        ref,
                        `translateY(${status ? -Utils.env.getScreenHeight() : Utils.env.getScreenHeight()}px)`,
                        status,
                        callback
                    )
                }
            }
        }
    };
</script>

<style scoped>
    .list {
        position: fixed;
        width: 750px;
        background-color: #F2F3F4;
    }
</style>
