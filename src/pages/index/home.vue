<template>
    <tab-bar-view
            :tab-titles="titles"
            :tab-styles="tabStyles"
            title-type="icon">
        <!-- 第一个页面内容-->
        <div class="item-container" :style="this['contentStyle']">
            <hot style="flex: 1"/>
        </div>

        <!-- 第二个页面内容-->
        <div class="item-container" :style="this['contentStyle']">
            <events style="flex: 1">
            </events>
        </div>

        <!-- 第三个页面内容-->
        <div class="item-container" :style="this['contentStyle']">
            <star style="flex: 1"/>
        </div>

        <!-- 第四个页面内容-->
        <div class="item-container" :style="this['contentStyle']">
            <search style="flex: 1"/>
        </div>

        <!-- 第五个页面内容-->
        <div class="item-container" :style="this['contentStyle']">
            <user style="flex: 1"/>
        </div>
    </tab-bar-view>
</template>

<script>
    import {Utils} from 'weex-ui'
    import user from "@/pages/index/user";
    import search from "@/pages/index/search";
    import star from "@/pages/index/star";
    import hot from "@/pages/index/hot";
    import events from "@/pages/index/events";
    import tabBarView from "@/widget/tabBarView";

    let titles = [
        {
            title: '热门仓库',
            icon: require('../../res/hot(1).png').default,
            activeIcon: require('../../res/hot.png').default
        },
        {
            title: '事件',
            icon: require('../../res/event(1).png').default,
            activeIcon: require('../../res/event.png').default
        },
        {
            title: '我的star',
            icon: require('../../res/starBig(1).png').default,
            activeIcon: require('../../res/starBig.png').default,
        },
        {
            title: '搜索',
            icon: require('../../res/search(1).png').default,
            activeIcon: require('../../res/search.png').default
        },
        {
            title: '个人信息',
            icon: require('../../res/userInfo(1).png').default,
            activeIcon: require('../../res/userInfo.png').default
        }
    ];
    let styles = {
        bgColor: '#FFFFFF',
        titleColor: '#666666',
        activeTitleColor: '#3D3D3D',
        activeBgColor: '#FFFFFF',
        isActiveTitleBold: true,
        iconWidth: 45,
        iconHeight: 45,
        width: 140,
        height: 120,
        fontSize: 24,
        textPaddingLeft: 10,
        textPaddingRight: 10
    };

    export default {
        name: "home",
        components: {
            user,
            search,
            star,
            hot,
            events,
            tabBarView
        },
        created() {
            const tabPageHeight = Utils.env.getPageHeight();
            // 如果页面没有导航栏，可以用下面这个计算高度的方法
            // const tabPageHeight = env.deviceHeight / env.deviceWidth * 750;
            const {tabStyles} = this;
            this["contentStyle"] = {
                height: (tabPageHeight - tabStyles.height) + 'px'
            };
        },
        data() {
            return {
                tabStyles: styles,
                titles: titles
            }
        }
    }
</script>

<style scoped>
    .item-container {
        width: 750px;
        height: auto;
        background-color: #f2f3f4;
        align-items: center;
        justify-content: center;
    }
</style>