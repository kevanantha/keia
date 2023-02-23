<template>
  <div class="loading">
    <a-spin :tip="tip" size="large" />
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: ['tip']
}
</script>

<style scoped>
.loading {
  text-align: center;
  padding: 30px 50px;
}
</style>
