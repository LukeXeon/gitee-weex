<template>
    <list @loadmore="onLoadMore">
        <slot name="header">
        </slot>
        <cell v-for="(item,index) in items" :key="index">
            <repos-item :item="item">
            </repos-item>
        </cell>
    </list>
</template>


<script>
    import reposItem from "@/widget/reposItem";

    export default {
        components: {
            reposItem
        },
        methods: {
            onLoadMore() {
                this.$emit('loadMore')
            },
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