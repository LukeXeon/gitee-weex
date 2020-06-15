<template>
    <div class="wrapper" style="flex: 1">
        <router-view class="content"/>
    </div>
</template>

<script>
    export default {
        name: 'App',
        async created() {

        },
        data() {
            return {}
        }
    }
</script>

<style scoped>
    .wrapper {
        justify-content: center;
        align-items: center;
    }

    .content {
        flex: 1;
    }
</style>
