<template>
    <list @loadmore="onLoadMore"
          loadmoreoffset="20">
        <slot name="header">
        </slot>
        <cell v-if="!(items.length===0)"
              v-for="(item,index) in items" :key="index">
            <repos-item :item="item">
            </repos-item>
        </cell>
        <cell v-else>
            <wxc-result
                    type="noNetwork"
                    show="true"
                    padding-top="232">
            </wxc-result>
        </cell>
    </list>
</template>


<script>
    import reposItem from "@/widget/reposItem";
    import {WxcResult} from 'weex-ui'

    export default {
        components: {
            reposItem,
            WxcResult
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