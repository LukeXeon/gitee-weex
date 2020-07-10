<template>
    <div style="flex: 1;width: 750px">
        <tab-bar-view
                style="flex: 1"
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
        <wxc-popup popup-color="transparent"
                   :show="isBottomShow"
                   @wxcPopupOverlayClicked="popupOverlayBottomClick"
                   pos="bottom"
                   height="200">
            <div class="bottom-bar" @click="onClickToRepos">
                <image class="icon" :src="icon">
                </image>
                <div class="text-group">
                    <text class="repos">{{repos}}</text>
                    <text class="user">{{user}}</text>
                    <text class="user">{{url}}</text>
                </div>
            </div>
        </wxc-popup>
    </div>
</template>

<script>
    import {Utils, WxcPopup} from 'weex-ui'
    import user from "@/pages/index/user";
    import search from "@/pages/index/search";
    import star from "@/pages/index/star";
    import hot from "@/pages/index/hot";
    import events from "@/pages/index/events";
    import tabBarView from "@/widget/tabBarView";
    import utils from "@/libs/utils";
    import gitee from "@/libs/gitee";

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
            tabBarView,
            WxcPopup
        },
        methods: {
            popupOverlayBottomClick() {
                this.isBottomShow = false
            },
            onClickToRepos() {
                utils.jumpTo('repository', {
                    user: this.user,
                    repos: this.repos,
                    branch: this.branch,
                    icon: this.icon
                })
            }
        },
        created() {
            let globalEvent = weex.requireModule('globalEvent');
            globalEvent.addEventListener('WXApplicationDidBecomeActiveEvent', async (e) => {
                let text = await utils.getClipboard()
                if (text && text.startsWith('https://gitee.com/') && text.length > 'https://gitee.com/'.length) {
                    let user = ''
                    let repos = ''
                    let data = await gitee.getRepos(user, repos)
                    this.icon = data['owner']['avatar_url']
                    this.user = user
                    this.repos = repos
                    this.url = text
                    this.branch = data['default_branch']
                    this.isBottomShow = true
                }
            });
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
                titles: titles,
                isBottomShow: true,
                icon: '',
                user: 'user',
                repos: 'repos',
                url: 'url',
                branch: ''
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

    .bottom-bar {
        flex: 1;
        background-color: white;
        border-radius: 30px;
        margin: 20px;
        align-items: center;
        padding: 10px;
        flex-direction: row
    }

    .icon {
        margin-left: 12px;
        border-radius: 10px;
        width: 120px;
        height: 120px;
        background-color: #0088fb;
    }

    .text-group {
        flex-direction: column;
        flex: 1;
        height: 120px;
        margin-left: 15px;
    }

    .user {
        lines: 1;
        max-width: 500px;
        text-overflow: ellipsis;
        font-size: 30px;
    }

    .repos {
        lines: 1;
        max-width: 500px;
        text-overflow: ellipsis;
        font-weight: bold;
        font-size: 35px;
    }
</style>