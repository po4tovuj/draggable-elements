<template>
  <div :class="`photo ${contentClass}`">
    <b-image
      :src="url"
      custom-class="photo__img"
      :alt="title || `Image doesn't have name`"
    >
    </b-image>
    <p class="photo__title">{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: 'PhotoCard',
  props: {
    title: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    },
    contentClass: {
      type: String,
      default: '',
    },
    // albumId: {
    //   type: Number,
    //   default: null,
    // },
    // id: {
    //   type: Number,
    //   default: null,
    // },
  },
}
</script>

<style lang="scss" scoped>
.photo {
  display: flex;
  flex-direction: column;
  // align-items: center;s
  overflow: hidden;
  &__img {
    // max-width: 100px;
  }
  &__title {
    text-align: start;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }
}
</style>
