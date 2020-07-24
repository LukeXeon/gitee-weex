<template>
    <div style="flex: 1">
        <repos-page
                v-if="mode==='repos'"
                :useEmptyView="false"
                style="flex: 1"
                :model="this.reposLoader">
        </repos-page>
        <user-page v-else
                   :model="this.userLoader"
                   style="flex: 1">
        </user-page>
        <wxc-loading :show="isLoading"
                     :loadingPic="require('@/res/loading.gif').default"
                     :need-mask="true">
        </wxc-loading>
    </div>
</template>

<script>
    import reposPage from "@/widget/reposPage";
    import gitee from "@/libs/gitee";
    import format from "@/libs/date.format";
    import userPage from "@/widget/userPage";
    import {WxcLoading} from 'weex-ui'
    import utils from "@/libs/utils";

    const emptyLoader = ()=> ([])

    export default {
        name: "searchList",
        props: {
            searchText: String,
            mode: {
                type: String,
                default: 'repos'
            },
            language:String
        },
        components: {
            reposPage,
            userPage,
            WxcLoading
        },
        computed: {
            reposLoader() {
                let text = this.searchText
                if (text) {
                    return async (page) => {

                        let list = [];
                        try {
                            let data = await gitee.searchRepos(this.searchText, this.language, page, 20);
                            for (let i = 0; i < data.length; i++) {
                                let item = data[i];
                                let color = gitee.getLanguageColor(item['language']);
                                let updatedAt = format.format(new Date(item['updated_at']), 'Y年m月d日');
                                let type = gitee.getReposType(item);
                                list.push({
                                    icon: item['owner']['avatar_url'],
                                    username: item['namespace']['path'],
                                    repos: item['path'],
                                    displayReposName: item['name'],
                                    displayUsername: item['namespace']['name'],
                                    updatedAt: updatedAt,
                                    languageColor: color,
                                    language: item['language'] || "其他",
                                    description: item['description'],
                                    starCount: item['stargazers_count'],
                                    forkCount: item['forks_count'],
                                    watchCount: item['watchers_count'],
                                    branch: item['default_branch'],
                                    type: type
                                })
                            }
                            if (page === 1 && list.length === 0) {
                                let modal = weex.requireModule('modal')
                                modal.alert({
                                    message: "没有找到数据"
                                })
                            }
                        }
                        finally {
                            this.isLoading = false
                        }
                        return list
                    }
                } else {
                    this.isLoading = false
                    return emptyLoader
                }
            },
            userLoader() {
                let text = this.searchText
                if (text) {
                    return async (page) => {
                        let list = []
                        try {
                            let data = await gitee.searchUser(this.searchText, page, 20)
                            for (let i = 0; i < data.length; i++) {
                                let item = data[i];
                                list.push({
                                    nikeName: item['name'],
                                    username: item['login'],
                                    icon: item['avatar_url'],
                                    url: item['html_url']
                                })
                            }
                        } finally {
                            this.isLoading = false
                        }
                        return list
                    }
                } else {
                    this.isLoading = false
                    return emptyLoader
                }
            }
        },
        data() {
            return {
                isLoading: true
            }
        }
    }
</script>

<style scoped>

</style>