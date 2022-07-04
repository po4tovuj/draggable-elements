import PhotoCard from '~/components/PhotoCard.vue';
<template>
  <div class="card">
    <header class="card-header">
      <b-button
        class="album-btn"
        type="is-primary"
        outlined
        icon-left="close-circle"
        @click="handleClose"
      >
      </b-button>

      <!-- <div> -->
      <b-button class="album-btn" type="success" @click="handleSave">
        Save
      </b-button>

      <b-button
        class="album-btn"
        icon-right="delete"
        type="is-danger"
        @click="handleDelete"
      >
        Delete</b-button
      >
      <!-- </div> -->
    </header>
    <div class="card-content">
      <p class="card-title card-title has-text-grey">
        <b-field label="Title" label-position="on-border">
          <b-input
            v-model="localAlbum.title"
            size="is-medium"
            class="mb-4"
            required
            validation-message="Title should contain at least on symbol"
          ></b-input>
        </b-field>
      </p>
      <ul class="photo-list">
        <li class="drop-zone-area">
          <drop-down-btn
            @cb="openModal(localAlbum.id, localAlbum.title)"
          ></drop-down-btn>
        </li>
        <li
          v-for="photo in album.photos"
          :key="photo.id"
          class="photo-list__item"
        >
          <photo-card v-bind="photo"></photo-card>
        </li>
      </ul>
    </div>
    <b-modal
      v-model="showModal"
      :can-cancel="false"
      trap-focus
      :destroy-on-hide="true"
      aria-role="dialog"
      aria-label="Add photo to the album"
      aria-modal
      scroll="clip"
    >
      <template #default>
        <photo-modal :cb="handleAddPhoto" v-bind="addModal"></photo-modal>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import PhotoModal from './modals/PhotoModal.vue'
import PhotoCard from '~/components/PhotoCard.vue'
import DropDownBtn from '~/components/DropDownBtn.vue'

export default {
  name: 'AlbumForm',

  components: { PhotoCard, DropDownBtn, PhotoModal },
  props: {
    album: {
      type: Object,
      default: () => ({
        id: null,
        title: '',
        userId: 1,
        photos: [],
      }),
    },
    deleteCb: {
      type: Function,
      default: () => {},
    },
    saveCb: {
      type: Function,
      default: () => {},
    },
    unsortedPhotoList: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      isInvalid: false,
      showModal: false,
      addModal: {
        unsortedList: [],
        selectedPhoto: [],
      },
      localAlbum: {
        id: null,
        title: '',
        userId: 1,
        photos: [],
      },
    }
  },
  mounted() {
    this.localAlbum = JSON.parse(JSON.stringify(this.album))
  },
  methods: {
    ...mapActions({
      addPhotoToAlbum: 'photo/addPhotoToAlbum',
    }),
    danger() {
      this.$buefy.toast.open({
        duration: 5000,
        message: `Album title should contain at least one symbol`,
        position: 'is-top',
        type: 'is-danger',
      })
    },
    handleClose() {
      const path = this.$nuxt.context.from?.path || '/'
      this.$router.push(path)
    },
    handleSave() {
      if (!this.localAlbum.title) {
        return this.danger()
      }
      this.saveCb(this.localAlbum)
      this.handleClose()
    },
    handleDelete() {
      this.handleClose()
      this.deleteCb(this.localAlbum.id)
    },
    openModal(id, title) {
      this.addModal = {
        album: {
          albumId: id,
          title,
        },
        unsortedList: this.unsortedPhotoList,
      }

      this.showModal = true
    },
    handleAddPhoto({ selectedPhoto }) {
      this.showModal = false
      this.addPhotoToAlbum({
        albumId: this.addModal.album.albumId,
        photos: selectedPhoto,
      })
    },
  },
}
</script>
<style lang="scss"></style>
<style lang="scss" scoped>
.card-header {
  display: flex;
  padding: 1.5em;
  justify-content: flex-end;
  gap: 20px;
  .album-btn {
    display: block;
    &:first-child {
      margin-right: auto;
    }
  }
}
</style>
