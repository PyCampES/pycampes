<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <Header />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'

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
