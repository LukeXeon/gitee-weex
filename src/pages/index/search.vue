<template>
    <div class="wrapper">
        <div class="top-bar">
            <search-bar
                    ref="searchBar"
                    @onReturn="onReturn"
                    @onInput="onInput"
                    @onClose="onClose">
            </search-bar>
            <div class="select-bar">
                <div style="flex: 1"></div>
                <tab-view @select="onSelect"
                          :tabs="['仓库','用户']">
                </tab-view>
                <div class="right-item">
                    <image style="width: 50px;height: 50px;"
                           @click="onShowLangList"
                           v-if="searchMode==='repos'"
                           :src="require('@/res/options.png').default">
                    </image>
                </div>
            </div>
        </div>
        <search-history v-if="showListMode==='history'"
                        @textSelected="onTextSelected">
        </search-history>
        <search-list v-if="showListMode==='search'"
                     style="flex: 1"
                     :language="languageName"
                     :mode="searchMode"
                     :searchText="summitText">
        </search-list>
        <wxc-popup
                pos="right"
                :width="600"
                @wxcPopupOverlayClicked="popupOverlayBottomClick"
                popup-color="whitesmoke"
                :show="isShowLangList">
            <div style="flex-direction: column;width: 600px">
                <index-list :list="languageList"
                            @itemSelected="onLangSelected">
                </index-list>
            </div>
        </wxc-popup>
    </div>
</template>

<style scoped>

    .wrapper {
        background-color: whitesmoke;
        flex: 1;
    }

    .top-bar {
        padding-top: 5px;
        background-color: #fdfdfd;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-bottom-color: #dddddd;
        border-bottom-width: 0.5px;
    }

    .select-bar {
        flex: 1;
        flex-direction: row;
        width: 750px;
        margin-top: 10px;
        margin-bottom: 20px;
        justify-content: space-between;
        align-items: center
    }

    .right-item {
        flex: 1;
        flex-direction: row;
        justify-content: flex-end;
        height: 60px;
        align-items: center;
        padding-right: 20px
    }

</style>

<script>
    import tabView from "@/widget/tabView";
    import searchHistory from "@/pages/index/searchHistory";
    import searchList from "@/pages/index/searchList";
    import searchBar from "@/pages/index/searchBar";
    import utils from "@/libs/utils";
    import {WxcPopup} from 'weex-ui'
    import IndexList from "@/widget/indexList";
    import languages from '@/res/languages.json'
    import gitee from "@/libs/gitee";

    async function saveText(newText) {
        if (newText.length === 0 || newText.trim().length === 0) {
            return
        }
        let text = await utils.getValue('search_history')
        let list
        try {
            list = JSON.parse(text)
        } catch (e) {
        }
        if (!Array.isArray(list)) {
            list = []
        }
        if (list.length > 10) {
            list.pop()
        }
        if (list.length > 0) {
            let index = list.indexOf(newText)
            if (index !== -1) {
                list.splice(index, 1)
            }
        }
        list.unshift(newText)
        await utils.setValue('search_history', JSON.stringify(list))
    }

    const languageList = []

    for (let i = 0; i < languages['length']; i++) {
        let item = languages[i]
        let name = item['name']
        languageList.push({
            name: name,
            color: gitee.getLanguageColor(name),
        })
    }

    export default {
        components: {
            IndexList,
            searchBar,
            tabView,
            searchHistory,
            searchList,
            WxcPopup
        },
        name: "search",
        methods: {
            async onTextSelected(e) {
                this.showListMode = 'search'
                this.summitText = e.text
                this.$refs.searchBar.setValue(e.text)
                await this.saveText(this.tempText)
            },
            onSelect(e) {
                if (e.index === 0) {
                    this.searchMode = 'repos'
                } else {
                    this.searchMode = 'user'
                }
            },
            async onReturn() {
                this.showListMode = 'search'
                await saveText(this.summitText)
            },
            async onClose() {
                this.showListMode = 'history'
            },
            onInput(e) {
                this.summitText = e.value;
                this.showListMode = 'history'
            },
            onShowLangList() {
                this.$refs.searchBar.blur()
                this.isShowLangList = true
                this.showListMode = 'history'
            },
            popupOverlayBottomClick() {
                this.isShowLangList = false
            },
            onLangSelected(e) {
                this.languageName = e.value.name === '所有语言' ? '' : e.value.name
            }
        },
        data() {
            return {
                summitText: '',
                showListMode: 'history',
                searchMode: 'repos',
                isLoading: false,
                isShowLangList: false,
                languageName: '',
                languageList: languageList
            }
        }
    }
</script>

