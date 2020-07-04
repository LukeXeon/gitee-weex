<template>
    <div style="flex: 1">
        <repos-page
                v-if="mode==='repos'"
                :useEmptyView="false"
                style="flex: 1"
                :model="this.reposLoader">
        </repos-page>
        <user-list v-else
                   :model="this.userLoader"
                   style="flex: 1">
        </user-list>
    </div>
</template>

<script>
    import utils from "@/libs/utils";
    import reposPage from "@/widget/reposPage";
    import gitee from "@/libs/gitee";
    import format from "@/libs/date.format";
    import userList from "@/widget/userList";

    export default {
        name: "searchList",
        props: {
            searchText: String,
            mode: {
                type: String,
                default: 'repos'
            }
        },
        components: {
            reposPage,
            userList
        },
        methods: {
            async reposLoader(page) {
                if (this.searchText) {
                    let data = await gitee.searchRepos(this.searchText, null, page, 20);
                    let list = [];
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
                    return list
                } else {
                    return []
                }
            },
            async userLoader(page) {
                if (this.searchText) {
                    let data = await gitee.searchUser(this.searchText, page, 20)
                    let list = []
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i];
                        list.push({
                            username: item['login'],
                            icon: item['avatar_url'],
                            url: item['html_url']
                        })
                    }
                    return list
                } else {
                    return []
                }
            }
        },
        async created() {
            if (this.searchText) {
                let text = await utils.getValue('search_history')
                let list = [];
                if (text) {
                    list = JSON.parse(text)
                }
                if (list.length > 10) {
                    list.pop()
                }
                if (list.length > 0) {
                    let index = list.indexOf(this.searchText)
                    if (index !== -1) {
                        list.splice(index, 1)
                    }
                    list.push(this.searchText)
                }
                await utils.setValue('search_history', JSON.stringify(list))
            }
        }
    }
</script>

<style scoped>

</style>