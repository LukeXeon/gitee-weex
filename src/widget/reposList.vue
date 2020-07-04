<template>
    <list @loadmore="onLoadMore"
          alwaysScrollableVertical="true">
        <slot name="header">
        </slot>
        <cell v-for="(item,index) in items" :key="index">
            <repos-item :item="item"
                        @onItemClick="onItemClick">
            </repos-item>
        </cell>
        <cell v-if="useEmptyView&&!(items!==undefined&&items!=null&&typeof items==='object'&&items.length!==0)"
              style="flex-direction: column;align-items: center">
            <text class="text">这里什么也没有，下拉刷新试试</text>
            <image class="image" :src="empty">
            </image>
        </cell>
    </list>
</template>


<script>
    import reposItem from "@/widget/reposItem";
    import {Utils} from 'weex-ui'

    const empty = require('@/res/empty.png').default

    export default {
        components: {
            reposItem
        },
        computed: {
            top: () => Utils.env.getPageHeight() * 0.2
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
            useEmptyView:{
                type:Boolean,
                default:true
            },
            items: {
                type: Array,
                default: () => ([])
            }
        },
        name: "reposList",
        data() {
            return {
                empty: empty
            }
        }
    }
</script>

<style scoped>
    .text {
        font-size: 30px;
        margin-top: 30px;
        text-align: center
    }

    .image {
        width: 200px;
        height: 200px
    }
</style>