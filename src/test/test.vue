<template>
    <div style="flex: 1;background-color: #00B4FF;width: 750px">
        <commits style="flex: 1">
        </commits>
    </div>
</template>
<script>
    import commits from '@/pages/commits/index.vue'

    export default {
        components: {
            commits
        },
        name: "test",
        data() {
            let list = []
            return {
                list: list
            }
        }
    }
</script>

<style scoped>
</style>