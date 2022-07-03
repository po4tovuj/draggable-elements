<template>
  <div class="single-album">
    <Card :title="album.title">
      <template #body>
        <ul>
          <li>
            <drop-down-btn :cb="openModal"></drop-down-btn>
          </li>
          <photo-card
            v-for="photo in album.photos"
            :key="photo.id"
            v-bind="photo"
          ></photo-card>
        </ul>
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
            <photo-modal :un-sorted-list="unSortedList"></photo-modal>
          </template>
        </b-modal>
      </template>
    </Card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from '~/components/Card.vue'
import DropDownBtn from '~/components/dropDownBtn.vue'
import PhotoModal from '~/components/modals/photoModal.vue'
import PhotoCard from '~/components/PhotoCard.vue'
export default {
  components: { Card, DropDownBtn, PhotoModal, PhotoCard },
  data() {
    return {
      album: {
        title: '',
        id: null,
        photos: [],
      },
      showModal: false,
      selected: [],
    }
  },
  computed: {
    ...mapGetters({
      unSortedList: 'photo/getUnsorted',
    }),
    // album() {
    //   return this.$store.getters['photo/getAlbum'](this.$route.params.id)
    // },
  },
  mounted() {
    const { id = null } = this.$route.params
    if (id) {
      this.album = this.$store.getters['photo/getAlbum'](parseInt(id))
    }
  },
  methods: {
    openModal() {
      this.showModal = true
    },
  },
}
</script>

<style lang="scss" scoped>
.single-album:deep {
  .card-title {
    font-size: 35px;
  }

  .photo {
    flex-direction: row;
    gap: 30px;
    &-wrapper:not(:last-child) {
      margin-bottom: 20px;
    }
    .b-image-wrapper {
      width: 100px;
    }
  }
}
</style>
