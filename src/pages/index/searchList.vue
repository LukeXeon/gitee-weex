<template>

</template>

<script>
    import utils from "@/libs/utils";
    import reposPage from "@/widget/reposPage";

    export default {
        name: "searchList",
        props: {
            searchText: String
        },
        components: {
            reposPage
        },
        async created() {
            if (this.searchText) {
                let text = await utils.getValue('search_history')
                let list = []
                if (text) {
                    list = JSON.parse(text)
                }
                if (list.length > 10) {
                    list.pop()
                }
                if (list.length > 0) {
                    let index = list.indexOf(this.searchText)
                    if (index !== -1) {
                        list.splice(index, 1)
                    }
                    list.push(this.searchText)
                }
                await utils.setValue('search_history', JSON.stringify(list))
            }
        }
    }
</script>

<style scoped>

</style>