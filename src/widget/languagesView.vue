<template>
    <div class="list"
         ref="list"
         :style="animationStyle">
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
                       :city-location-config="currentItemConfig"
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
    import {Utils, WxcIndexlist, WxcResult, WxcSearchbar} from 'weex-ui'

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
            Items: {
                type: Array,
                default: () => ([])
            },
            currentItem: {
                type: String
            },
        },
        data: () => ({
            displayList: [],
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
            animationStyle: () => (Utils.uiStyle.pageTransitionAnimationStyle(this.animationType)),
            currentItemConfig() {
                if (this.currentItem) {
                    return {
                        type: 'list',
                        title: "当前",
                        list: [{
                            name: this.currentItem,
                            isLocation: true
                        }]
                    }
                } else {
                    return {}
                }
            },
            normalList() {
                let list = []
                for (let i = 0; i < this.displayList.length; i++) {
                    let item = this.displayList[i]
                    list.push({
                        name: item.name
                    })
                }
                return list
            },
            showError: () => (this.normalList && this.normalList.length < 1),
            listHeight: () => (Utils.env.getPageHeight() - 84),
        },
        methods: {
            onItemClick(e) {
                this.$refs.searchbar.autoBlur();
                this.show(false);
                this.$emit('itemSelected', {item: e.item});
            },
            onInput(e) {
                const {value} = e;
                if (value !== '' && this.items && this.items.length > 0) {
                    this.onlyShowList = true;
                    this.displayList = Enumerable.from(this.items)
                        .where((item) => {
                            return item.name.startsWith(value.trim())
                        })
                } else {
                    this.onlyShowList = false;
                    this.displayList = this.items
                }
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
            show(status = true) {
                const ref = this.$refs.list
                if (this.animationType === 'push') {
                    Utils.animation.pageTransitionAnimation(
                        ref,
                        `translateX(${status ? -750 : 750}px)`,
                        status
                    )
                } else if (this.animationType === 'model') {
                    let text = status ? -Utils.env.getScreenHeight() : Utils.env.getScreenHeight()
                    Utils.animation.pageTransitionAnimation(
                        ref,
                        `translateY(${text}px)`,
                        status
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
