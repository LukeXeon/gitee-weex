<template>
    <div>
        <slider infinite="false"
                style="flex: 1;width: 750px;">
            <repos-page-with-title
                    style="width: 750px;"
                    v-for="(item,index) in items"
                    :key="index"
                    :title="item[0]"
                    :model="item[1]"/>
        </slider>
    </div>
</template>

<script>
    import reposList from "@/widget/reposList";
    import gitee from "@/libs/gitee";
    import format from '@/libs/date.format'
    import ReposPageWithTitle from "@/widget/reposPageWithTitle";

    function wrapLoadFunction(model) {
        return async function (page) {
            let data = await model(Math.max(1, page))

            function buildList(items) {
                let list = []
                for (let j = 0; j < items.length; j++) {
                    let item = items[j]
                    let color = gitee.getLanguageColor(item['language'])
                    let updatedAt = format.format(new Date(item['last_push_at']), 'Y年m月d日')
                    let type = gitee.getReposType(item)
                    list.push({
                        icon: item['namespace']['avatar'] || item['owner']['new_portrait'],
                        username: item['namespace']['path'],
                        repos: item['path'],
                        displayReposName: item['name'],
                        displayUsername: item['namespace']['name'],
                        updatedAt: updatedAt,
                        languageColor: color,
                        language: item['language'] || "其他",
                        description: item['description'],
                        starCount: item['stars_count'],
                        forkCount: item['forks_count'],
                        watchCount: item['watches_count'],
                        branch: item['default_branch'],
                        type: type
                    })
                }
                return list
            }

            return buildList(data)
        }
    }

    export default {
        name: "hot",
        components: {
            ReposPageWithTitle,
            reposList
        },
        data() {
            return {
                items: [
                    ["推荐", wrapLoadFunction(gitee.getPopular)],
                    ["热门", wrapLoadFunction(gitee.getLatest)],
                    ["最近更新", wrapLoadFunction(gitee.getFeatured)]
                ]
            }
        }
    }
</script>

<style scoped>

</style>