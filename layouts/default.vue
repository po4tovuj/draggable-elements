<template>
  <div>
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
    </header>
    <section class="main-content columns">
      <div class="container column is-10">
        <Nuxt />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' },
        },
      ],
    }
  },
}
</script>
<style lang="scss">
.header {
  .navbar {
    padding: 0 20px;
  }
  .nav-link-list {
    display: flex;
    align-items: center;
    gap: 10px;
    .nav-link {
      color: white;
      font-size: 20px;
    }
  }
}
.container {
  padding-top: 2em;
  padding-bottom: 2em;
}
</style>
