<template>
  <div class="q-pa-xl">
    <div class="column items-center">
      <div class="col" style="width: 120vh;">
        <p>
          <span class="text-h5" style="color: $bg-primary">EVENTO</span>
        </p>
        <p>
          {{ $store.state.evento }}
        </p>
      </div>

      <div class="col q-pt-sm" style="width: 120vh;">
        <div class="row justify-center">
          <q-card class="col">
            <q-card-section align="center">
              <q-img 
                src="@/assets/python_comunidad.svg"
                width="45%"
                height="45%"
                class="q-pt-sm"
              />

              <div class="text-h6 q-pt-sm">COMUNIDAD</div>
              
              <p class="q-pt-sm">
                {{ $store.state.lorem }}
              </p>
            </q-card-section>

          </q-card>

          <q-card class="col">
            <q-card-section align="center">
              <q-img 
                src="@/assets/open_source.svg"
                width="45%"
                height="45%"
                class="q-pt-sm"
              />
              
              <div class="text-h6 q-pt-sm">OPEN SOURCE</div>
              
              <p class="q-pt-sm"> 
                {{ $store.state.lorem }}
              </p>
            </q-card-section>
          </q-card>

          <q-card class="col">
            <q-card-section align="center">
              <q-img 
                src="@/assets/naturaleza.svg"
                width="45%"
                height="45%"
                class="q-pt-sm"
              />
              
              <div class="text-h6 q-pt-sm">NATURALEZA</div>
            
              <p class="q-pt-sm">
                {{ $store.state.lorem }}
              </p>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="col q-pt-md" style="width: 120vh;">
        <p>
          <span class="text-h5" style="color: $bg-primary">¿A QUIÉN VA DIRIGIDO?</span>
        </p>
        <p>
          {{ $store.state.evento }}
        </p>
      </div>
    </div>
  </div>
</template>

<style>
</style>

<script>
  export default {
    name: 'Evento'
  }
</script>
