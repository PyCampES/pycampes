<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <Header />
      <Evento />
      <Asistir />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import Header from './components/Header.vue'
import Evento from './components/Evento.vue'
import Asistir from './components/Asistir.vue'

export default {
  name: 'LayoutDefault',

  components: {
    Header,
    Evento,
    Asistir
  },

  setup () {
    return {
      leftDrawerOpen: ref(false)
    }
  }
}
</script>
