<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title card-title has-text-grey">
        {{ title }}
      </p>
      <slot name="header"></slot>
    </header>
    <div class="card-content">
      <slot :photo-list="photoList"> some text </slot>
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
    albumId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    photoList() {
      return this.$store.getters['photo/getAlbumPhoto'](this.albumId)
    },
  },
}
</script>
<style lang="scss" scoped></style>
