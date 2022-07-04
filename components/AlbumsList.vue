<template>
  <div class="column">
    <draggable
      v-model="contents"
      tag="ul"
      :group="outerDragOptions"
      class="album-list"
      :class="{ 'album-list--column': !homePage }"
    >
      <li
        v-for="el in contents"
        :key="el.id"
        :class="`album-wrapper`"
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
              class="inner-photo-list"
              :data-album-id="el.id"
              tag="ul"
              :group="innerDragOptions"
              @end="onEnd"
              @change="(e) => handleChange({ e, albumId: el.id })"
            >
              <li class="drop-zone-area">
                <drop-down-btn @cb="openModal(el.id, el.title)"></drop-down-btn>
              </li>
              <li
                v-for="(photo, idx) in el.photos.slice(0, 8)"
                :key="photo.id + '' + photo.url"
                :data-photo-id="photo.id"
                class="inner-photo-list__item"
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
import DropDownBtn from './DropDownBtn.vue'
import PhotoCard from './PhotoCard.vue'
import PhotoModal from './modals/PhotoModal.vue'
// import '~/assets/abstracts/_mixins.scss'
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
  display: flex;
  flex-wrap: wrap;
  margin: -15px;

  .album-wrapper {
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 1px rgba(0, 0, 0, 0.14),
      0px 2px 1px rgba(0, 0, 0, 0.2);
    margin: 15px;
    width: calc(100% - 30px);
  }
  .empty-box {
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 10px;
    cursor: pointer;
  }
  .inner-photo-list {
    max-width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    &__item {
    }

    .drop-zone-area {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin-bottom: 10px;

      cursor: pointer;
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
      align-items: center;

      &__title {
        display: none;
      }
    }
  }
}

@include large-screen {
  .album-list:deep {
    .album-wrapper {
      width: calc(100% / 3 - 30px);
    }
    .inner-photo-list {
      width: 100%;
      &__item {
        width: 90px;
        margin: 0;
      }
    }
  }
}
</style>
