<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <Header />

      <Evento />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import Evento from './components/Evento.vue'
import Header from './components/Header.vue'

export default {
  name: 'LayoutDefault',

  components: {
    Header,
    Evento
  },

  setup () {
    return {
      leftDrawerOpen: ref(false)
    }
  }
}
</script>
