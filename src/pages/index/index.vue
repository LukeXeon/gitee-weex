<template>
    <div class="wrapper"
         ref="root">
        <router-view class="content"/>
    </div>
</template>

<script>
    import utils from "@/libs/utils";

    export default {
        name: 'App',
        created() {
            this.$router.afterEach(async () => {
                let root = this.$refs['root']
                if (root) {
                    await utils.animate(root, {
                        styles: {
                            opacity: 0,
                        },
                        duration: 0, //ms
                        timingFunction: 'ease',
                        needLayout: false,
                    })
                    await utils.animate(root, {
                        styles: {
                            opacity: 1,
                        },
                        duration: 500, //ms
                        timingFunction: 'ease',
                        needLayout: false,
                    })
                }
            })
        },
        data() {
            return {}
        }
    }
</script>

<style scoped>
    .wrapper {
        flex: 1;
        justify-content: center;
        align-items: center;
    }

    .content {
        flex: 1;
    }
</style>
