<template>
  <div>
    <Card :title="`Add Photo to ${album.title}`">
      <template #header>
        <b-button @click="addPhoto">Add</b-button>
        <button type="button" class="delete ml-2" @click="handleClose" />
      </template>
      <template #body>
        <ul class="modal-photo-list">
          <li
            v-for="photo in unsortedList"
            :key="photo.id"
            class="photo-wrapper"
          >
            <!-- <div class="photo-check"> -->
            <b-checkbox v-model="selected" :native-value="photo.id">
              <!-- </div> -->
              <photo-card v-bind="photo"> </photo-card>
            </b-checkbox>
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
      console.log('addPhoto: ', this.cb)

      this.cb({ selectedPhoto: this.selected, albumId: this.albumId })
    },
  },
}
</script>

<style lang="scss" scoped>
.photo-wrapper {
  display: flex;
  align-items: center;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
}
</style>
s
