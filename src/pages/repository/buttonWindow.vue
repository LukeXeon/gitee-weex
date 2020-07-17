<template>
    <div class="bottom-window">
        <div class="item"
             @click="onClick(index)"
             v-for="(item,index) in buttons">
            <image class="item-icon"
                   :src="item.icon">
            </image>
            <text class="item-text">{{item.text}}</text>
        </div>
    </div>
</template>

<script>
    import commits from '@/res/commits.png'
    import watch1 from '@/res/watch(1).png'
    import watch2 from '@/res/watch(2).png'
    import fork from '@/res/fork.png'
    import wiki from '@/res/wiki.png'
    import release from '@/res/release.png'
    import gitee from "@/libs/gitee";
    import utils from "@/libs/utils";

    export default {
        name: "buttonWindow",
        props: {
            user: String,
            repos: String,
            isWatched: Boolean,
        },
        computed: {
            buttons() {
                return [
                    {
                        icon: !this.isWatched ? watch1 : watch2,
                        text: 'Watch'
                    },
                    {
                        icon: fork,
                        text: 'Fork'
                    },
                    {
                        icon: wiki,
                        text: 'Wiki'
                    },
                    {
                        icon: commits,
                        text: 'Commits'
                    },
                    {
                        icon: release,
                        text: 'Releases'
                    }
                ]
            }
        },
        methods: {
            async onClick(index) {
                switch (index) {
                    case 0: {
                        if (this.isWatched) {
                            await gitee.cancelWatch(this.user, this.repos)
                        } else {
                            await gitee.watch(this.user, this.repos)
                        }
                    }
                        break
                    case 1: {
                        await gitee.fork(this.user, this.repos)
                    }
                        break
                    case 2: {
                        let url = `https://gitee.com/${this.user}/${this.repos}/wikis`
                        utils.jumpTo('webview', {
                            url: url
                        })
                    }
                        break
                    case 3: {
                        utils.jumpTo('commits', {
                            user: this.user,
                            repos: this.repos
                        })
                    }
                        break
                    case 4: {
                        let url = `https://gitee.com/${this.user}/${this.repos}/releases`
                        utils.jumpTo('webview', {
                            url: url
                        })
                    }
                        break
                }
            }
        }
    }
</script>

<style scoped>
    .bottom-window {
        flex: 1;
        background-color: white;
        border-radius: 30px;
        margin: 20px;
        flex-direction: row;
        align-items: center;
        padding-left: 10px;
        padding-right: 10px;
    }

    .item{
        justify-content: center;
        flex-direction: column;
        align-items: center;
        flex: 1;
    }

    .item-icon{
        width: 70px;
        height: 70px;
    }

    .item-text{
        margin-top: 5px;
        font-size: 22px;
        text-align: center;
    }
</style>