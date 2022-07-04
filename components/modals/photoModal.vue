<template>
  <div class="modal-photo">
    <Card
      class="px-2 modal-photo__title"
      :title="`Add Photo to ${album.title}`"
    >
      <template #header>
        <b-button @click="addPhoto">Add</b-button>
        <b-button
          class="ml-2"
          type="is-danger"
          icon-left="close-circle"
          @click="handleClose"
        >
        </b-button>
      </template>
      <template #body>
        <ul class="modal-photo-list">
          <li
            v-for="photo in unsortedList"
            :key="photo.id"
            class="modal-photo-item"
          >
            <!-- <div class="photo-check"> -->
            <!-- <div> -->
            <b-checkbox v-model="selected" :native-value="photo.id">
            </b-checkbox>
            <!-- </div> -->
            <!-- </div> -->
            <photo-card v-bind="photo" @click.native="selectItem(photo.id)">
            </photo-card>
          </li>
        </ul>
      </template>
    </Card>
  </div>
</template>

<script>
import Card from '~/components/Card.vue'
import PhotoCard from '~/components/PhotoCard.vue'

export default {
  components: { Card, PhotoCard },
  props: {
    unsortedList: {
      type: Array,
      default: () => [],
    },
    cb: {
      type: Function,
      default: () => {},
    },
    album: {
      type: Object,
      default: () => ({
        title: '',
        id: null,
      }),
    },
  },
  data() {
    return {
      selected: [],
    }
  },

  methods: {
    handleClose() {
      this.$parent.close()
    },
    addPhoto() {
      this.cb({ selectedPhoto: this.selected, albumId: this.albumId })
    },
    selectItem(id) {
      if (this.selected.includes(id)) {
        this.selected = this.selected.filter((item) => item !== id)
        return
      }
      this.selected.push(id)
    },
  },
}
</script>
<style lang="scss">
.modal-content {
  overflow: hidden;
}
</style>
<style lang="scss" scoped>
.modal-photo-list:deep {
  display: flex;
  flex-direction: column;
  gap: 10px;
  .modal-photo-item {
    display: flex;
    align-items: center;
  }
  .photo {
    display: flex;
    flex-direction: row;
    align-items: center;
    .b-image-wrapper {
      width: 90px;
      min-width: 90px;
      margin-right: 10px;
    }
  }
}
</style>
