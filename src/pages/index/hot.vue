<template>
    <div>
        <slider infinite="false"
                style="flex: 1;width: 750px;">
            <repos-page
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
    import reposPage from "@/pages/index/reposPage";

    function wrapLoadFunction(model) {
        return async function (page) {
            let loadLanguageTask = gitee.loadLanguages()
            let data = await model(page)
            let language = await loadLanguageTask;

            function buildList(items) {
                let list = []
                for (let j = 0; j < items.length; j++) {
                    let item = items[j]
                    list.push([
                        item['owner']['new_portrait'],
                        item['owner']['username'],
                        item['name'],
                        item['description'],
                        item['last_push_at'],
                        "color",
                        item['language'],
                        item['stars_count'],
                        item['forks_count']
                    ])
                }
                return list
            }

            return buildList(data)
        }
    }

    export default {
        name: "hot",
        components: {
            reposPage,
            reposList
        },
        data() {
            return {
                items: [
                    ["流行的仓库", wrapLoadFunction(gitee.getPopular)],
                    ["最近的仓库", wrapLoadFunction(gitee.getLatest)],
                    ["有趣的仓库", wrapLoadFunction(gitee.getFeatured)]
                ]
            }
        }
    }
</script>

<style scoped>

</style>