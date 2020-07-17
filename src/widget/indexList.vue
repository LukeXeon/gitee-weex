<template>
    <div class="wrapper"
         :style="{height:pageHeight}">
        <list style="flex: 1">
            <cell style="flex-direction: column">
                <div style="flex-direction: column"
                     v-if="selectedTitle&&selectedItem&&selectedTitle.length>0">
                    <div class="group-title-wrapper">
                        <text class="group-title">{{selectedTitle}}</text>
                    </div>
                    <div class="group-item">
                        <div class="group-item-point"
                             :style="{'background-color': selectedItem.color}"></div>
                        <text class="group-item-text">{{selectedItem.name}}</text>
                        <image class="group-item-image"
                               :src="require('@/res/correct.png').default">
                        </image>
                    </div>
                </div>
            </cell>
            <cell class="group"
                  :key="'key'+group.char"
                  :ref="'group'+group.char"
                  v-for="(group,index) in displayList">
                <div class="group-title-wrapper">
                    <text class="group-title">{{group.char}}</text>
                </div>
                <div class="group-item"
                     @click="onClick(item)"
                     v-for="(item,index2) in group.subList">
                    <div class="group-item-point"
                         :style="{'background-color': item.color}"></div>
                    <text class="group-item-text">{{item.name}}</text>
                    <image class="group-item-image"
                           v-if="selectedItem&&selectedItem.name===item.name"
                           :src="require('@/res/correct.png').default">
                    </image>
                </div>
            </cell>
            <cell style="height: 200px">
            </cell>
        </list>
        <div class="index-list-nav">
            <text class="list-nav-key"
                  @click="go2key(item.char)"
                  v-for="(item,index) in displayList">{{item.char}}</text>
        </div>
        <div class="index-list-pop"
             v-if="popKeyShow">
            <text class="list-pop-text">{{popKey}}</text>
        </div>
    </div>
</template>

<style scoped>
    .wrapper{
        background-color: whitesmoke;
    }

    .group {
        flex-direction: column;
    }

    .group-title-wrapper {
        flex-direction: row;
        background-color: #E5E5E5;
        align-items: center;
        justify-content: flex-start;
        height: 50px;
    }

    .group-title {
        font-weight: bold;
        font-size: 30px;
        text-align: center;
        margin-left: 40px;
    }

    .group-item {
        align-items: center;
        flex-direction: row;
        background-color: white;
        height: 80px;
        border-bottom-color: #dddddd;
        border-bottom-width: 0.5px;
    }

    .group-item-text {
        margin-left: 20px;
        font-size: 30px;
        flex: 1;
        lines:1;
        text-overflow: ellipsis;
    }

    .group-item-point {
        margin-left: 40px;
        width: 35px;
        height: 35px;
        border-radius: 50px;
    }

    .group-item-image {
        margin-right: 70px;
        width: 35px;
        height: 35px;
    }

    .index-list-nav {
        position: absolute;
        top: 0;
        right: 0;
        margin-bottom: 60px;
        margin-top: 60px;
        padding-bottom: 20px;
        padding-top: 20px;
        width: 70px;
        flex-direction: column;
    }

    .list-nav-key {
        text-align: center;
        font-size: 24px;
        height: 40px;
        color: #666666;
    }

    .index-list-pop {
        position: fixed;
        top: 550px;
        left: 316px;
        width: 120px;
        height: 120px;
        text-align: center;
        justify-content: center;
        background-color: rgba(32, 35, 37, .6);
        border-radius: 60px;
        padding: 35px 0;
        color: #ffffff;
    }

    .list-pop-text {
        font-size: 40px;
        text-align: center;
        color: white;
    }
</style>

<script>
    import {Utils} from 'weex-ui'
    import utils from "@/libs/utils";

    const LETTERS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    export default {
        name: "indexList",
        props: {
            list: {
                type: Array,
                default: () => ([])
            },
            selectedTitle: {
                type: String,
                default: '当前'
            },
            useAll: {
                type: Boolean,
                default: true
            },
        },
        computed: {
            displayList() {
                let list = this.list
                let temp = []
                for (let i = 0; i < LETTERS.length; i++) {
                    temp.push({
                        char: LETTERS[i],
                        subList: []
                    })
                }
                temp.push({
                    char: '#',
                    subList: []
                })
                for (let i = 0; i < list.length; i++) {
                    let item = list[i]
                    if (item.name && item.name.length > 0) {
                        let index = LETTERS.indexOf(item.name[0].toString().toUpperCase())
                        if (index === -1) {
                            index = LETTERS.length
                        }
                        temp[index].subList.push(item)
                    }
                }
                let output = []
                for (let i = 0; i < temp.length; i++) {
                    let item = temp[i]
                    if (item.subList.length > 0) {
                        output.push(item)
                    }
                }
                if (this.useAll) {
                    output.unshift({
                        char: '@',
                        subList: [
                            {
                                name: '所有语言',
                                color: '#dddddd'
                            }
                        ]
                    })
                }
                return output
            },
            pageHeight(){
                return Utils.env.getPageHeight()
            }
        },
        methods: {
            async onClick(item) {
                await this.setSelectedItem(item)
                this.$emit('itemSelected', {value: item})
            },
            async setSelectedItem(item) {
                this.selectedItem = item;
                await utils.setValue('select-lang', JSON.stringify(item))
            },
            go2key(key) {
                let dom = weex.requireModule('dom')
                let group = this.$refs['group' + key][0]
                if (group) {
                    dom.scrollToElement(group, {
                        offset: 0,
                        animated: true
                    })
                }
                this.popKey = key;
                this.popKeyShow = true;
                this.timer && clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.popKeyShow = false;
                }, 600);
            }
        },
        async created() {
            try {
                this.selectedItem = JSON.parse(await utils.getValue('select-lang'))
            } catch (e) {
                if (this.useAll) {
                    this.selectedItem = this.displayList[0].subList[0]
                }
            }
        },
        data() {
            return {
                popKey: '',
                popKeyShow: false,
                timer: null,
                selectedItem: null
            }
        }
    }
</script>

