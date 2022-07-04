<template>
  <div class="card new-album">
    <header class="card-header mb-4">
      <p class="card-header-title card-title has-text-grey">
        {{ album.title }}
      </p>
      <b-button @click="handleSave">Save</b-button>
      <button type="button" class="delete ml-2" @click="handleClose" />
    </header>
    <section class="new-album-body">
      <b-field label-position="on-border" class="mb-4" label="Title">
        <b-input v-model="album.title" size="is-medium"></b-input>
      </b-field>
      <ul class="modal-photo-list">
        <li
          v-for="photo in unsortedList"
          :key="photo.id"
          class="modal-photo-item"
        >
          <!-- <div class="photo-check"> -->
          <div>
            <b-checkbox v-model="album.photos" :native-value="photo.id">
            </b-checkbox>
          </div>
          <!-- </div> -->
          <photo-card v-bind="photo" @click.native="selectItem(photo.id)">
          </photo-card>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import PhotoCard from '~/components/PhotoCard.vue'

const createRandomValue = () => {
  const arr = new Uint32Array(1)
  const random = window.crypto.getRandomValues(arr)
  return random[0]
}
export default {
  components: {
    PhotoCard,
  },
  props: {
    unsortedList: {
      type: Array,
      default: () => [],
    },
    cb: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      album: {
        title: 'New Album',
        id: createRandomValue(),
        photos: [],
        userId: 1,
      },

      isInvalid: false,
    }
  },
  methods: {
    handleSave() {
      if (!this.album.title.length) {
        this.isInvalid = true
        return
      }
      this.handleClose()
      return this.cb(this.album)
    },
    handleClose() {
      this.$parent.close()
    },
    selectItem(id) {
      if (this.album.photos.includes(id)) {
        this.album.photos = this.album.photos.filter((item) => item !== id)
        return
      }
      this.album.photos.push(id)
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-content {
  overflow: hidden;
  height: 700px;
}
.new-album {
  height: 100%;
}
.card-header {
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  .card-title {
    // padding-left: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.new-album-body {
  padding: 20px 20px 40px;
  height: calc(100% - 90px);
  overflow-y: auto;
}
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
