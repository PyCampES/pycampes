<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <Header />

      <BannerHome />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
// import HelloWorld from './components/HelloWorld.vue'
import Header from './components/Header.vue'
import BannerHome from './components/BannerHome.vue'

export default {
  name: 'LayoutDefault',

  components: {
    Header,
    BannerHome
  },

  setup () {
    return {
      leftDrawerOpen: ref(false)
    }
  }
}
</script>
