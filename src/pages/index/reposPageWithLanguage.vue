<template>
    <div style="flex-direction: column">
        <wxc-minibar
                :title="title"
                leftButton=""
                text-color="black"
                background-color="#FBFBFB"/>
        <repos-page :model="model">
        </repos-page>
        <wxc-indexlist>
        </wxc-indexlist>
    </div>
</template>

<script>
    import Enumerable from 'linq'
    import gitee from "@/libs/gitee";
    import {WxcIndexlist} from 'weex-ui'
    import languagesView from "@/widget/languagesView";

    export default {
        name: "reposPageWithLanguage",
        components: {
            WxcIndexlist,
            languagesView
        },
        data() {
            return {
                language: 3,
                isShowPopup: false,
                title: "推荐",
                model: async function (page) {
                    let language = this.language
                    let projects = await gitee.getLanguageProject(language, page)

                }
            }
        }
    }
</script>

<style scoped>

</style>