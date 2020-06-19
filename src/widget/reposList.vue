<template>
    <list @loadmore="onLoadMore">
        <slot name="header">
        </slot>
        <cell v-if="items!==undefined&&items!=null&&typeof items==='object'&&items.length!==0"
              v-for="(item,index) in items" :key="index">
            <repos-item :item="item"
                        @onItemClick="onItemClick">
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
            onItemClick(e) {
                this.$emit('onItemClick', e)
            },
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