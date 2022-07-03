<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title card-title has-text-grey">
        {{ title }}
      </p>
      <slot name="header"></slot>
    </header>
    <div class="card-content">
      <slot name="body"> </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BuefyCard',
  props: {
    title: {
      type: String,
      default: '',
    },
    photoList: {
      type: Array,
      default: null,
    },
  },
  computed: {},
}
</script>
<style lang="scss" scoped>
.card-header {
  display: flex;
  align-items: center;
  padding: 0 1em;
  .card-title {
    padding-left: 0;
  }
}
</style>
