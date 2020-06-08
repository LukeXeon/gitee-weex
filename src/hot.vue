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

    export default {
        name: "hot",
        components: {
            WxcMinibar,
            reposList
        },
        data() {
            return {
                items: [
                    // 0        1            2       3             4           5       6       7        8
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                    ["icon", "username", "repos", "distribute", "updateAt", "color", "lang", "star", "fork"],
                ]
            }
        }
    }
</script>

<style scoped>

</style>