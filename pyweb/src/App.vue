<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <Header />

      <HelloWorld />

      <Footer />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "LayoutDefault",

  components: {
    Header,
    HelloWorld,
    Footer,
  },

  setup() {
    return {
      leftDrawerOpen: ref(false),
    };
  },
};
</script>
