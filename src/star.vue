<template>
    <div style="flex: 1">
        <wxc-minibar title="我的star"
                     leftButton=""
                     text-color="black"
                     background-color="#FBFBFB"/>
        <repos-list :items="items"/>
    </div>
</template>


<style scoped>

</style>

<script>
    import {WxcMinibar} from 'weex-ui'
    import reposList from "@/reposList";
    import gitee from "@/gitee";

    export default {
        components: {
            WxcMinibar,
            reposList
        },
        name: "star",
        async created() {
            let data = await gitee.getStars(0, 20)
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
            this.items = list
        },
        data() {
            return {
                items: [
                    // 0        1            2       3             4           5       6       7        8
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                ]
            }
        }
    }
</script>
