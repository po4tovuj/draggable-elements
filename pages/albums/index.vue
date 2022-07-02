<template>
  <div>
    <ul class="album-list">
      <li v-for="album in albumList" :key="album.id" class="album-list__item">
        <card class="album" :title="album.title">
          <template #default>
            <photos-list
              :album-photo-list="album.photos"
              :is-in-albums="true"
            ></photos-list>
          </template>
        </card>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from '~/components/Card.vue'
import PhotosList from '~/components/PhotosList.vue'

export default {
  components: { Card, PhotosList },

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
  .album {
    .photo-list {
      grid-template-columns: repeat(auto-fit, minmax(40%, 45%));
      grid-auto-flow: row;
    }
    .photo {
      .b-image-wrapper {
        min-width: 70px;
      }
      &__title {
        display: block;
      }
    }
  }
}
</style>
