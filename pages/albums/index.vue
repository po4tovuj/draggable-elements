<template>
  <div>
    <AlbumsList :home-page="false" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Card from '~/components/Card.vue'
// import PhotosList from '~/components/PhotosList.vue'
import AlbumsList from '~/components/AlbumsList.vue'

export default {
  components: {
    // Card, PhotosList,
    AlbumsList,
  },
  async fetch({ store, route }) {
    if (store.state.photo.albums.length) {
      return
    }
    await store.dispatch('photo/getAlbums')
  },
  data() {
    return {}
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
  grid-template-columns: repeat(auto-fill, minmax(40%, 1fr));

  .photo-list {
    grid-template-columns: repeat(auto-fit, minmax(40%, 45%));
    grid-auto-flow: row;
  }

  .album {
    .photo {
      .b-image-wrapper {
        width: 70px;
      }
    }
    .photo__title {
      display: block !important;
      margin-left: 20px;
      font-size: 18px;
    }
  }
}
</style>
