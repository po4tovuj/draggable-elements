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
  activated() {
    console.log(this.$fetchState)
  },
  async fetch({ store, route }) {
    // if (from.path) {
    //   return
    // }
    // if (areAlbumsLoaded) {
    //   return
    // }
    await store.dispatch('photo/getAlbums')
    await store.dispatch('photo/getPhotos')
    return {}
  },
  // activated() {
  //   // Call fetch again if last fetch more than 30 sec ago
  //   // if (this.$fetchState.timestamp <= Date.now() - 10000) {
  //   this.$fetch()
  //   // }
  // },

  computed: {
    ...mapGetters({
      albums: 'photo/getAlbums',
    }),
  },
}
</script>
