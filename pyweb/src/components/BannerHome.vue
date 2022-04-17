<template>
  <section id= "banner-home">
    <q-parallax>
      <template v-slot:media >
        <img src="../assets/bannerHome.jpg">
      </template>

      <template v-slot:content="scope">
        <div
          class="absolute container"
          :style="{
            opacity: 0.99 + (1 - scope.percentScrolled) * 0.55,
            top: (scope.percentScrolled * 0.1) + '%',
          }"
        >
          <img src="../assets/pycamp-logo.png" style="width: 520px; height: auto">
        <div style= "width:420px; margin:auto 0">

          <div class="text-h5 text-white text-bold" >
              {{ $store.state.bannerHomeMessage1}}
          </div>
          <div class="text-h6 text-white" >
              {{ $store.state.bannerHomeMessage2}}
          </div>

          <div class="q-mt-sm">
            <q-input
              ref="inputRef"
              filled
              v-model="model"
              label="Correo Electroníco"
              bg-color= "grey-3"
              :rules="[val => !!val || 'Field is required']"
            />

            <q-btn class="q-mt-sm" label="Enviar" @click="reset" color="primary"/>
          </div>
        </div>
      </div>  
      </template>
      
    </q-parallax>
  </section>
  
</template>

<script>
export default {
  name: 'BannerHome'
}
</script>

<style scoped>
.container{
  width:100%;
  height:100%;
  display:flex;
  justify-content:space-between;
  align-items: center;
  padding:50px;
  background-color: rgba(0,0,0,0.3);
}
</style>