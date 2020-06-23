<template>
    <div style="flex: 1">
        <repos-page-with-title
                style="width: 750px;flex: 1"
                title="我的star"
                :model="model">
        </repos-page-with-title>
    </div>
</template>

<style scoped>
</style>

<script>
    import gitee from "@/libs/gitee";
    import ReposPageWithTitle from "@/widget/reposPageWithTitle";
    import format from "@/libs/date.format";
    import htmlUtils from "@/libs/htmlUtils";
    import utils from "@/libs/utils";

    async function loader(page) {
        let user = await gitee.loadMyInfo()
        let data = await gitee.getStars(user['id'], Math.max(1, page))
        let list = []
        for (let i = 0; i < data.length; i++) {
            let item = data[i]
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

    export default {
        components: {
            ReposPageWithTitle,
        },
        name: "star",
        data() {
            return {
                model: loader
            }
        }
    }
</script>
