<template>
    <recycle-list for="(item,index) in items">
        <cell-slot>
            <repos-item :item="item">
            </repos-item>
        </cell-slot>
    </recycle-list>
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