<template>
    <list>
        <cell v-for="(item,index) in items" :key="index">
            <repos-item :item="item">
            </repos-item>
        </cell>
    </list>
</template>


<script>
    import reposItem from "@/reposItem";
    export default {
        components: {
            reposItem
        },
        props: {
            items: {
                type: Array,
                default: () => ([])
            }
        },
        name: "reposList"
    }
</script>

<style scoped>

</style>