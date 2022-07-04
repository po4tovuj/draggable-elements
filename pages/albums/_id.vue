<template>
  <div class="single-album">
    <album-form
      :album="getSelectedAlbum"
      :unsorted-photo-list="unsortedList"
      :save-cb="handleSave"
      :delete-cb="handleDelete"
    ></album-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AlbumForm from '~/components/AlbumForm.vue'
export default {
  components: { AlbumForm },
  props: {
    id: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {}
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
      changeAlbumName: 'photo/changeAlbumName',
      deleteAlbum: 'photo/deleteAlbum',
    }),
    handleSave({ id, title }) {
      this.changeAlbumName({ id, title })
    },
    handleDelete(id) {
      this.deleteAlbum(id)
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
