<template>
  <div>
    <AlbumsList :home-page="false" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AlbumsList from '~/components/AlbumsList.vue'

export default {
  components: {
    AlbumsList,
  },
  async fetch({ store, error }) {
    // as we are not going to save/edit/delete data with API, only local
    // lets just check is data were loaded or not if not lets get try to get it
    if (!store.state.photo.albums.length) {
      await store.dispatch('photo/getAlbums').catch((err) => {
        error(err)
      })
    }
    if (!store.state.photo.photos.length) {
      await store.dispatch('photo/getPhotos').catch((err) => {
        error(err)
      })
    }
  },

  computed: {
    ...mapGetters({
      albumList: 'photo/getAlbums',
    }),
  },
}
</script>

<style lang="scss">
.album-list {
  // grid-template-columns: repeat(auto-fill, minmax(40%, 1fr));

  .photo-list {
    // grid-template-columns: repeat(auto-fit, minmax(40%, 45%));
    // grid-auto-flow: row;
  }

  .album {
    .photo {
      .b-image-wrapper {
        width: 70px;
      }
    }
    .photo__title {
      display: block;
      margin-left: 20px;
      font-size: 18px;
    }
  }
}
</style>
