<template>
  <q-header elevated class="bg-primary">
    <q-toolbar>
      <q-avatar>
        <img src="../assets/logo.svg">
      </q-avatar>

      <!-- Este es un ejemplo de uso de una variable local declarada es store/index.js -->
      <!-- <q-toolbar-title>
        {{ $store.state.tituloHeader }}
      </q-toolbar-title> -->

    </q-toolbar>
  </q-header>
</template>

<style>
</style>

<script>
  export default {
    name: 'Header'
  }
</script>
