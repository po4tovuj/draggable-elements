<template>
  <section class="section">
    <div class="columns">
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

  async fetch({ store, route, error }) {
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
      albums: 'photo/getAlbums',
    }),
  },
}
</script>
