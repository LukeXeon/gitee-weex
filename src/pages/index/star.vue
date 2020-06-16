<template>
    <div style="flex: 1">
        <repos-page style="width: 750px;flex: 1"
                    title="我的star"
                    :model="model">
        </repos-page>
    </div>
</template>

<style scoped>
</style>

<script>
    import reposPage from "@/pages/index/reposPage";
    import gitee from "@/libs/gitee";

    async function loader(page) {
        let loadLanguageTask = gitee.loadLanguages()
        let data = await gitee.getStars(Math.max(1, page + 1), 20)
        let languages = await loadLanguageTask;
        let list = []
        for (let i = 0; i < data.length; i++) {
            let item = data[i]
            list.push([
                item['owner']['avatar_url'],
                item['owner']['login'],
                item['name'],
                item['description'],
                item['updated_at'],
                "color",
                item['language'],
                item['stargazers_count'],
                item['forks_count']
            ])
        }
        return list
    }

    export default {
        components: {
            reposPage
        },
        name: "star",
        data() {
            return {
                model: loader
            }
        }
    }
</script>
