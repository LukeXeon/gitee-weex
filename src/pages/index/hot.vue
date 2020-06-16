<template>
    <div>
        <slider infinite="false"
                style="flex: 1;width: 750px;">
<!--            <repos-page-with-language-->
<!--                    style="width: 750px">-->
<!--            </repos-page-with-language>-->
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
    import ReposPageWithTitle from "@/widget/reposPageWithTitle";
    //import ReposPageWithLanguage from "@/pages/index/reposPageWithLanguage";

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