<template>
  <section class="section">
    <div class="columns is-flex-wrap-wrap is-mobile">
      <albums-list></albums-list>
    </div>
    <photos-list> </photos-list>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

import PhotosList from '~/components/PhotosList.vue'
import AlbumsList from '~/components/AlbumsList.vue'

export default {
  name: 'IndexPage',
  components: {
    PhotosList,
    AlbumsList,
  },

  async fetch({ store, route }) {
    if (!store.state.photo.albums.length) {
      await store.dispatch('photo/getAlbums')
    }

    if (!store.state.photo.photos.length) {
      await store.dispatch('photo/getPhotos')
    }
  },

  computed: {
    ...mapGetters({
      albums: 'photo/getAlbums',
    }),
  },
}
</script>
