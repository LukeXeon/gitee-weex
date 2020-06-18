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

    async function loader(page) {
        let data = await gitee.getStars(Math.max(1, page + 1), 20)
        let list = []
        for (let i = 0; i < data.length; i++) {
            let item = data[i]
            let color = gitee.getLanguageColor(item['language'])
            list.push([
                item['owner']['avatar_url'],
                item['owner']['login'],
                item['name'],
                item['description'],
                item['updated_at'],
                color,
                item['language'] || "其他",
                item['stargazers_count'],
                item['forks_count'],
                item['path']
            ])
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
