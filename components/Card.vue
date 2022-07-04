<template>
  <div class="card">
    <header class="card-header" @click="allowEdit">
      <p class="card-header-title card-title has-text-grey">
        {{ title }}
        <b-field
          v-if="isFromSingle"
          ref="dataEditTitle"
          class="edit-field edit-field--hidden"
          label="change name"
          label-position="on-border"
        >
          <b-input v-model="editedTitle" type="text"></b-input>
          <p class="control">
            <b-button class="button is-primary" @click="changeAlbumName">
              Save
            </b-button>
          </p>
        </b-field>
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
    id: {
      type: Number,
      default: null,
    },
    editAlbumName: {
      type: Function,
      default: () => {},
    },
    photoList: {
      type: Array,
      default: null,
    },
    isFromSingle: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      editedTitle: '',
      counter: 0,
    }
  },
  methods: {
    allowEdit(e) {
      this.counter++

      if (this.counter === 1) {
        this.timer = setTimeout(() => {
          this.counter = 0
        }, 500)

        return
      }

      clearTimeout(this.timer)
      this.counter = 0

      const editField = e.currentTarget.querySelector('.edit-field')
      this.editedTitle = this.title
      editField.classList.toggle('edit-field--hidden')
    },
    changeAlbumName() {
      this.editAlbumName({ id: this.id, title: this.editedTitle })
      this.$refs.dataEditTitle.$el.classList.toggle('edit-field--hidden')
    },
  },
}
</script>
<style lang="scss">
.edit-field {
  position: absolute !important;
  background: white;
  top: 10px;
  left: 0px;
  height: calc(100% - 20px);
  width: calc(100% - 20px);
  .label {
    font-size: 16px;
  }
  .field-body {
    height: 100%;
    .field {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;

      .control.is-clearfix {
        height: 100%;
        width: 100%;
        margin-right: 20px;
        .input {
          height: 100% !important;
        }
      }
    }
  }
  &--hidden {
    display: none;
  }
}
</style>
<style lang="scss" scoped>
.card-header {
  display: flex;
  align-items: center;
  padding: 0 1em;
  .card-title {
    padding-left: 0;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
}
</style>
