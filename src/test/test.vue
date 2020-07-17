<template>
    <div style="">
        <index-list style="flex: 1" :list="list">
        </index-list>
    </div>
</template>
<script>
    import languages from '@/res/colors.json'
    import IndexList from "@/widget/indexList";

    export default {
        name: "test",
        components: {IndexList},
        data() {
            let list = []
            let keys = Object.keys(languages)
            for (let i = 0; i < keys.length; i++) {
                let key = keys[i]
                let item = languages[key]
                list.push({
                    name: key,
                    color: item['color']||'#d6d6d6',
                })
            }
            return {
                list: list
            }
        }
    }
</script>

<style scoped>
</style>