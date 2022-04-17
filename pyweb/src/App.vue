<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <Header />
      <BannerHome />
      <Evento />
      <Asistir />
      <Footer />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import Header from './components/Header.vue'
import BannerHome from './components/BannerHome.vue'
import Evento from './components/Evento.vue'
import Asistir from './components/Asistir.vue'
import Footer from "./components/Footer.vue";

export default {
  name: "LayoutDefault",

  components: {
    Header,
    BannerHome,
    Evento,
    Asistir,
    Footer
  },

  setup() {
    return {
      leftDrawerOpen: ref(false),
    };
  },
};
</script>
