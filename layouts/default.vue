<template>
  <div>
    <Header />
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
}
</script>
<style lang="scss">
.container {
  padding-top: 2em;
  padding-bottom: 2em;
}
</style>
