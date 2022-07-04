<template>
  <button type="button" class="drop-btn" outlined @click="handleClick">
    <svg class="drop-icon" width="20" height="20">
      <use href="~assets/icons/icons.svg#plus"></use>
    </svg>
  </button>
</template>

<script>
export default {
  props: {
    cb: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    handleClick() {
      if (typeof this.cb === 'function') {
        return this.$emit('cb')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.drop-btn {
  // display: block;
  cursor: pointer;
  border-radius: 50%;
  font-size: 20px;
  width: 40px;
  height: 40px;

  position: relative;
  color: rgb(160, 249, 160);
  border: 2px solid currentColor;
  &:hover,
  &:focus {
    color: white;
    background-color: rgb(160, 249, 160);
  }
  .drop-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    fill: currentColor;
  }
}
</style>
