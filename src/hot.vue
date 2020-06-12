<template>
    <div style="flex: 1">
        <wxc-minibar title="热门仓库"
                     leftButton=""
                     text-color="black"
                     background-color="#FBFBFB"/>
        <repos-list :items="items"/>
    </div>
</template>

<script>
    import {WxcMinibar} from 'weex-ui'
    import reposList from "@/reposList";
    import gitee from "@/gitee";

    export default {
        name: "hot",
        components: {
            WxcMinibar,
            reposList
        },
        async created() {
            let data = await gitee.getLatest();
            let list = []
            for (let i = 0; i < data.length; i++) {
                let item = data[i]
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
            this.items = list;
        },
        data() {
            return {
                items: [
                    // 0        1            2       3             4           5       6       7        8
                    //["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                ]
            }
        }
    }
</script>

<style scoped>

</style>