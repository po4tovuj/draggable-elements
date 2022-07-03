<template>
  <div class="column">
    <draggable
      :list="albums"
      tag="ul"
      :group="outerDragOptions"
      class="album-list"
      :class="{ 'album-list--column': !homePage }"
    >
      <li
        v-for="el in albums"
        :key="el.id"
        :class="` album-wrapper`"
        :data-album-id="el.id"
      >
        <Card class="album" :album-id="el.id" :title="el.title">
          <template #header>
            <nuxt-link class="album__link-btn" :to="`/albums/${el.id}`">
              <b-button>Open</b-button>
            </nuxt-link>
          </template>
          <template #body>
            <draggable
              class="photo-list"
              :data-album-id="el.id"
              tag="ul"
              :group="innerDragOptions"
              @end="onEnd"
              @change="(e) => handleChange({ e, albumId: el.id })"
            >
              <li class="photo-list__item drop-zone-area">
                <drop-down-btn @cb="openModal(el.id, el.title)"></drop-down-btn>
              </li>
              <li
                v-for="(photo, idx) in el.photos.slice(0, 8)"
                :key="photo.id + '' + photo.url"
                :data-photo-id="photo.id"
                class="photo-list__item"
              >
                <nuxt-link
                  v-if="idx >= 7"
                  :to="`albums/${el.id}`"
                  class="empty-box"
                >
                  <p>....</p>
                </nuxt-link>
                <PhotoCard v-if="idx < 7" v-bind="photo" />
              </li>
            </draggable>
          </template>
        </Card>
      </li>
    </draggable>
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
import { mapActions, mapGetters } from 'vuex'
import DropDownBtn from './dropDownBtn.vue'
import PhotoCard from './PhotoCard.vue'
import PhotoModal from './modals/photoModal.vue'

export default {
  name: 'AlbumsList',

  components: { PhotoCard, DropDownBtn, PhotoModal },
  props: {
    homePage: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      showModal: false,
      addModal: {
        unsortedList: [],
        albumId: null,
        selectedPhoto: [],
      },
      albums: [],
      outerDragOptions: {
        name: 'g1',
        put: 'g1',
        clone: false,
        class: 'albums-wrapper',
      },
      innerDragOptions: {
        name: 'photo',
      },
    }
  },
  computed: {
    ...mapGetters({
      albumsList: 'photo/getAlbums',
      unsortedList: 'photo/getUnsorted',
    }),
    contents: {
      get() {
        return this.albumsList
      },
      set(val) {
        this.$store.commit('photo/sortAlbums', val)
      },
    },
  },
  mounted() {
    this.albums = [...this.albumsList]
  },
  methods: {
    ...mapActions({
      updateAlbums: 'photo/updateAlbums',
      movePhoto: 'photo/movePhoto',
      sortPhotoInAlbum: 'photo/sortPhotoInAlbum',
      addPhotoToAlbum: 'photo/addPhotoToAlbum',
    }),

    openModal(id, title) {
      this.addModal = {
        album: {
          albumId: id,
          title,
        },
        unsortedList: this.unsortedList,
      }

      this.showModal = true
    },
    handleAddPhoto({ albumId, selectedPhoto }) {
      console.log('selectedPhoto: ', this.addModal.album.albumId)
      this.showModal = false
      this.addPhotoToAlbum({
        albumId: this.addModal.album.albumId,
        photos: selectedPhoto,
      })
    },
    handleChange({ e: { moved, removed }, albumId }) {
      if (removed) return false
      if (moved && albumId) {
        this.sortPhotoInAlbum({
          albumId,
          newIndex: moved.newIndex,
          oldIndex: moved.oldIndex,
        })
      }
    },
    onEnd({ from, to, item }) {
      const prevAlbumId = from.getAttribute('data-album-id')
      const newAlbumId = to.getAttribute('data-album-id')
      const photoId = item.getAttribute('data-photo-id')
      if (newAlbumId === prevAlbumId) {
        return false
      }
      this.movePhoto({ newAlbumId, photoId, prevAlbumId })
    },
  },
}
</script>
<style lang="scss" scoped>
.album-list:deep {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
  &.album-list--column {
    grid-template-columns: 1fr;
  }
  .album-wrapper {
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 1px rgba(0, 0, 0, 0.14),
      0px 2px 1px rgba(0, 0, 0, 0.2);
  }
  .empty-box {
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 10px;
    cursor: pointer;
  }
  .photo-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    grid-template-rows: repeat(auto-fit, minmax(80px, 1fr));
    // grid-auto-flow: columns;
    justify-content: center;
    .drop-zone-area {
      display: flex;
      align-items: center;
      justify-content: center;
      grid-row: 1;
      grid-column: 1 / 5;
      cursor: pointer;
      .drop-btn {
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
    }
  }
  .album {
    height: 100%;
    .card-header {
      display: flex;
      align-items: center;
    }
    &__link-btn {
      color: inherit;
      padding: 0.75rem 1rem;
      // display: flex;
      // align-items: centers;
    }

    .card-title {
      display: block;

      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      // margin-right: 10px;
    }
    .photo {
      flex-direction: row;
      padding: 10px;
      align-items: center;

      .b-image-wrapper {
        // width: 60px;
      }
      &__title {
        display: none;
      }
    }
  }
}
</style>
