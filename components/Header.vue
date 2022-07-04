<template>
  <header class="header">
    <nav
      class="navbar has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="~assets/buefy.png" alt="Buefy" height="28" />
        </a>
      </div>
      <ul class="nav-link-list">
        <li>
          <NuxtLink
            exact
            to="/"
            class="nav-link"
            active-class="nav-link--active"
          >
            <b-icon icon="home" /> Home
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/albums"
            class="nav-link"
            active-class="nav-link--active"
          >
            <b-icon icon="folder-multiple-image" /> Albums
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <b-button class="header__create-btn" @click="showModal = true">
      Create Album
    </b-button>
    <b-modal
      v-model="showModal"
      :can-cancel="false"
      trap-focus
      :destroy-on-hide="true"
      aria-role="dialog"
      aria-label="Create Photo"
      aria-modal
    >
      <template #default>
        <new-album-modal :cb="handleCreateAlbum" :unsorted-list="unsortedList">
        </new-album-modal>
      </template>
    </b-modal>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import NewAlbumModal from './modals/NewAlbumModal.vue'
export default {
  components: { NewAlbumModal },

  data() {
    return {
      showModal: false,
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' },
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      unsortedList: 'photo/getUnsorted',
    }),
  },
  methods: {
    ...mapActions({
      createAlbum: 'photo/addAlbum',
    }),
    handleCreateAlbum(album) {
      this.createAlbum(album)
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  background: #7957d5;
  align-items: center;
  padding: 0 20px;

  &__create-btn {
    margin-left: auto;
    background: transparent;
    color: white;
    font-size: 20px;
    border: 0;
    &:hover,
    &:focus {
      color: cyan;
    }
  }
  .navbar {
  }
  .nav-link-list {
    display: flex;
    align-items: center;
    gap: 10px;
    .nav-link {
      color: white;
      font-size: 20px;
      &:hover,
      &--active {
        color: cyan;
      }
    }
  }
}
</style>
