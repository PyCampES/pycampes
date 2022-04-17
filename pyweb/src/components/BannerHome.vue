<template>
  <div class="q-pa-md">
    <q-parallax>
      <template v-slot:media>
        <img src="../assets/bannerHome.jpg">
      </template>

      <template v-slot:content="scope">
        <div
          class="absolute column"
          :style="{
            opacity: 0.99 + (1 - scope.percentScrolled) * 0.55,
            top: (scope.percentScrolled * 0.1) + '%',
            left: 0,
            right: 5
          }"
        >
          <img src="../assets/logo.svg" style="width: 420px; height: 420px; padding:0px">
        </div>

        <div class="text-h6 text-white" style="width: 420px">{{ $store.state.bannerHomeMessage}}</div>

        <div class="q-pa-md" style="width: 420px">
          <q-input
            ref="inputRef"
            filled
            v-model="model"
            label="Correo Electroníco"
            :rules="[val => !!val || 'Field is required']"
          />

          <q-btn class="q-mt-sm" label="Enviar" @click="reset" color="primary"/>
        </div>
        
      </template>
      
    </q-parallax>
  </div>
  
</template>

<script>
export default {
  name: 'BannerHome'
}
</script>