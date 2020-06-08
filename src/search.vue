<template>
    <div class="wrapper">
        <div class="top-bar">
            <wxc-searchbar ref="wxc-searchbar"
                           class="search-box"
                           @wxcSearchbarCancelClicked="wxcSearchbarCancelClicked"
                           @wxcSearchbarInputReturned="wxcSearchbarInputReturned"
                           @wxcSearchbarInputOnInput="wxcSearchbarInputOnInput"
                           @wxcSearchbarCloseClicked="wxcSearchbarCloseClicked"
                           @wxcSearchbarInputOnFocus="wxcSearchbarInputOnFocus"
                           @wxcSearchbarInputOnBlur="wxcSearchbarInputOnBlur">
            </wxc-searchbar>
            <div class="select-bar">
                <div style="flex: 1"></div>
                <tab-view style="height: 60px;width: 500px" :tabs="['仓库','用户']">
                </tab-view>
                <div class="right-item">
                    <image style="width: 60px;height: 60px;background-color: #238FFF">
                    </image>
                </div>
            </div>
        </div>
        <list class="list" v-if="searchText===''">
            <header class="header">
                <div class="header2">
                    <text style="font-size: 32px">搜索历史</text>
                    <image style="width: 60px;height: 60px;background-color: #238FFF">
                    </image>
                </div>
            </header>
            <cell v-for="(text,index) in historyItems" :key="index">
                <div class="item">
                    <text style="font-size: 32px">{{text}}</text>
                </div>
            </cell>
        </list>
        <div class="list" v-else>
            <div class="header">
                <div class="header2">
                    <text style="font-size: 32px;">{{lang}} | {{orderByUp?'最多star':'最少star'}}</text>
                    <image style="width: 60px;height: 60px;background-color: #00B4FF">
                    </image>
                </div>
            </div>
            <repos-list></repos-list>
        </div>
    </div>
</template>

<style scoped>
    .list {
        flex: 1;
        background-color: whitesmoke;
    }

    .wrapper {
        background-color: whitesmoke;
        flex: 1;
    }

    .top-bar {
        padding-top: 5px;
        background-color: white;
        justify-content: center;
        align-items: center;
        flex-direction: column
    }

    .search-box {
        margin: 5px;
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
        align-items: flex-end;
        padding-right: 20px
    }

    .header {
        flex-direction: column;
        width: 750px;
        border-top-width: 0.5px;
        border-top-color: #dddddd;
        border-bottom-width: 0.5px;
        border-bottom-color: #dddddd;
    }

    .header2 {
        flex: 1;
        background-color: white;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 10px 15px 10px 25px;
    }

    .item {
        flex: 1;
        background-color: white;
        padding-left: 25px;
        padding-right: 20px;
        border-top-width: 0.5px;
        border-top-color: #dddddd;
        border-bottom-width: 0.5px;
        border-bottom-color: #dddddd;
        width: 750px;
        height: 70px;
        justify-content: center;
    }

</style>

<script>
    import {WxcSearchbar} from 'weex-ui'
    import tabView from "@/tabView";
    import reposList from "@/reposList";

    let tabStyle = {
        lineSpacing: '0px',
        width: '200px',
        height: '50px',
        icon: '',
        color: '#333333',
        checkedColor: '#ffffff',
        disabledColor: '#eeeeee',
        borderColor: '#666666',
        checkedBorderColor: '#238FFF',
        backgroundColor: '#ffffff',
        checkedBackgroundColor: '#238FFF'
    }

    export default {
        components: {
            WxcSearchbar,
            tabView,
            reposList
        },
        name: "search",
        methods: {
            onSelect(params) {

            },
            wxcSearchbarInputOnFocus() {
            },
            wxcSearchbarInputOnBlur() {
            },
            wxcSearchbarInputReturned() {
            },
            wxcSearchbarCloseClicked() {
            },
            wxcSearchbarInputOnInput(e) {
                this.searchText = e.value;
            },
            wxcSearchbarCancelClicked() {
            },
            wxcSearchbarInputDisabledClicked() {
            },
            wxcSearchbarDepChooseClicked() {
            }
        },
        data() {
            return {
                lang: '所有语言',
                orderByUp: true,
                searchText: '',
                customStyles: tabStyle,
                historyItems: [
                    '1111',
                    '11111',
                    '1111',
                    '11111',

                    '1111',

                ]
            }
        }
    }
</script>

