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

export default {
  name: 'LayoutDefault',

  components: {
    Header,
  },

  setup () {
    return {
      leftDrawerOpen: ref(false)
    }
  }
}
</script>
