<template>
    <div style="flex: 1">
        <slider infinite="false"
                style="width: 750px;flex: 1">
            <hot-page
                    style="width: 750px;"
                    v-for="(item,index) in items"
                    key="index"
                    :title="item[0]"
                    :model="item[1]"/>
        </slider>
    </div>
</template>

<script>
    import reposList from "@/widget/reposList";
    import gitee from "@/libs/gitee";
    import HotPage from "@/pages/index/hotPage";
    import utils from "@/libs/utils";

    export default {
        name: "hot",
        components: {
            HotPage,
            reposList
        },
        data() {
            return {
                items: [
                    ["流行的仓库", gitee.getPopular],
                    ["最近的仓库", gitee.getLatest],
                    ["有趣的仓库", gitee.getFeatured]
                ]
            }
        }
    }
</script>

<style scoped>

</style>