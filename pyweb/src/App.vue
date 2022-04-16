<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <Header />

      <HelloWorld />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import Header from './components/Header.vue'

export default {
  name: 'LayoutDefault',

  components: {
    Header,
    HelloWorld
  },

  setup () {
    return {
      leftDrawerOpen: ref(false)
    }
  }
}
</script>
