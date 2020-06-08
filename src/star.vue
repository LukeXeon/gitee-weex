<template>
    <div style="flex: 1">
        <wxc-minibar title="我的star"
                     leftButton=""
                     text-color="black"
                     background-color="#FBFBFB"/>
        <recycle-list style="flex: 1">
        </recycle-list>
    </div>
</template>

<script>
    import {WxcMinibar} from 'weex-ui'

    export default {
        components: {
            WxcMinibar
        },
        name: "star"
    }
</script>

<style scoped>

</style>