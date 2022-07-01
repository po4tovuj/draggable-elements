<template>
  <section>
    <draggable v-model="photos" v-bind="dragOptions" @end="onEnd">
      <li v-for="photo in photos" :key="photo.id" :data-photo-id="photo.id">
        <photo-card v-bind="photo"></photo-card>
      </li>
    </draggable>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PhotoCard from './PhotoCard.vue'

export default {
  name: 'PhotoList',
  components: { PhotoCard },
  data() {
    return {
      dragOptions: {
        animation: 200,
        group: 'photo',
        disabled: false,
        ghostClass: 'ghost',
        class: 'photo-list',
        put: (e) => {},
        tag: 'ul',
      },
    }
  },

  computed: {
    ...mapGetters({
      photolist: 'photo/getUnsorted',
    }),
    photos: {
      get() {
        return this.photolist
      },
      set(val) {
        if (
          this.photolist.length === val.length ||
          this.photolist.length < val.length
        ) {
          this.$store.commit('photo/sortPhoto', val)
        }
      },
    },
  },

  methods: {
    ...mapActions({
      movePhoto: 'photo/movePhoto',
    }),

    onEnd({ from, to, item }) {
      const prevAlbumId = from.getAttribute('data-album-id')

      const newAlbumId = to.getAttribute('data-album-id')

      const photoId = item.getAttribute('data-photo-id')

      if (!prevAlbumId && !newAlbumId) return
      this.movePhoto({ prevAlbumId, newAlbumId, photoId })
    },
  },
}
</script>

<style lang="scss" scoped>
.photo-list {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
}
</style>
