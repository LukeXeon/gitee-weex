<template>
  <div class="wrapper" style="flex: 1">
    <router-view style="flex: 1"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
  .wrapper {
    justify-content: center;
    align-items: center;
  }
</style>
