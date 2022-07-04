<template>
  <div class="single-album">
    <Card
      v-if="getSelectedAlbum"
      :is-from-single="true"
      v-bind="getSelectedAlbum"
      :edit-album-name="editAlbumName"
    >
      <template #body>
        <ul class="photo-list">
          <li class="drop-zone-area">
            <drop-down-btn
              @cb="openModal(getSelectedAlbum.id, getSelectedAlbum.title)"
            ></drop-down-btn>
          </li>
          <li
            v-for="photo in getSelectedAlbum.photos"
            :key="photo.id"
            class="photo-list__item"
          >
            <photo-card v-bind="photo"></photo-card>
          </li>
        </ul>
      </template>
    </Card>
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
import Card from '~/components/Card.vue'
import DropDownBtn from '~/components/dropDownBtn.vue'
import PhotoModal from '~/components/modals/photoModal.vue'
import PhotoCard from '~/components/PhotoCard.vue'
export default {
  components: { Card, DropDownBtn, PhotoModal, PhotoCard },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!vm.getSelectedAlbum) {
        return vm.$nuxt.error({
          statusCode: 404,
          message: "Album doesn't exist",
        })
      }
    })
  },
  props: {
    id: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {
      addModal: {
        unsortedList: [],
        selectedPhoto: [],
      },
      showModal: false,
      selected: [],
    }
  },
  computed: {
    ...mapGetters({
      unsortedList: 'photo/getUnsorted',
      getAlbums: 'photo/getAlbums',
    }),
    getSelectedAlbum() {
      const { id = null } = this.$route.params

      const selectedAlbum = this.getAlbums.find(
        (item) => item.id === parseInt(id)
      )
      return selectedAlbum
    },
  },

  methods: {
    ...mapActions({
      addPhotoToAlbum: 'photo/addPhotoToAlbum',
      changeAlbumName: 'photo/changeAlbumName',
    }),
    editAlbumName(data) {
      this.changeAlbumName(data)
    },
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

<style lang="scss" scoped>
.single-album:deep {
  .drop-zone-area {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 10px;

    cursor: pointer;
  }
  .card-title {
    font-size: 35px;
  }
  .photo-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .photo {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 20px;
    &__title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    // &-wrapper:not(:last-child) {
    //   margin-bottom: 20px;
    // }
    .b-image-wrapper {
      width: 90px;
      min-width: 90px;
    }
  }
}
@include small-laptop {
  .single-album:deep {
    .photo-list {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
}
</style>
