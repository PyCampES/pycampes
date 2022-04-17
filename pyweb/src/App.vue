<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <Header />
      <BannerHome />
      <Evento />
      <Footer />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import Header from './components/Header.vue'
import BannerHome from './components/BannerHome.vue'
import Evento from "./components/Evento.vue";
import Footer from "./components/Footer.vue";


export default {
  name: "LayoutDefault",

  components: {
    Header,
    BannerHome
    Evento,
    Footer,
  },

  setup() {
    return {
      leftDrawerOpen: ref(false),
    };
  },
};
</script>
