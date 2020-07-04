<template>
    <div class="wrapper">
        <div class="top-bar">
            <search-bar
                    ref="searchbar"
                    @wxcSearchbarInputReturned="wxcSearchbarInputReturned"
                    @wxcSearchbarInputOnInput="wxcSearchbarInputOnInput"
                    @wxcSearchbarCloseClicked="wxcSearchbarCloseClicked"
                    @wxcSearchbarInputOnFocus="wxcSearchbarInputOnFocus"
                    @wxcSearchbarInputOnBlur="wxcSearchbarInputOnBlur">
            </search-bar>
            <div class="select-bar">
                <div style="flex: 1"></div>
                <tab-view style="height: 60px;width: 500px"
                          @select="onSelect"
                          :tabs="['仓库','用户']">
                </tab-view>
                <div class="right-item">
                    <image style="width: 50px;height: 50px;"
                           :src="require('@/res/options.png').default">
                    </image>
                </div>
            </div>
        </div>
        <search-history v-if="showListMode==='history'">
        </search-history>
        <search-list v-if="showListMode==='search'"
                     style="flex: 1"
                     :mode="searchMode"
                     :searchText="searchText">
        </search-list>
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

    export default {
        components: {
            searchBar,
            tabView,
            searchHistory,
            searchList
        },
        name: "search",
        methods: {
            onSelect(e) {
                if (e.index === 0) {
                    this.searchMode = 'repos'
                } else {
                    this.searchMode = 'user'
                }
            },
            wxcSearchbarInputOnFocus() {

            },
            wxcSearchbarInputOnBlur() {

            },
            wxcSearchbarInputReturned() {
                this.showListMode = 'search'
            },
            wxcSearchbarCloseClicked() {
                this.showListMode = 'history'
            },
            wxcSearchbarInputOnInput(e) {
                this.searchText = e.value;
            },
        },
        async created() {
        },
        data() {
            return {
                searchText: '',
                showListMode: 'history',
                searchMode: 'repos'
            }
        }
    }
</script>

