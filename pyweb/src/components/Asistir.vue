<template>
  <section id="asistir">
    <div class="q-pa-xl">
      <div class="column items-center">
        <div style="width: 120vh;">
          <p>
            <span class="text-h5 text-weight-bold" style="color: var(--q-primary)">ASISTIR</span>
          </p>
        </div>

        <div class="row" style="width: 120vh;">
          <div class="col-8">
            <p>
              La Pycamp se realizará en {{ $store.state.asistir_lugar }}
            </p>

            <p>
              <span class="text-weight-bold">
                Nombre
              </span><br>
              {{ $store.state.asistir_nombre_lugar }}
            </p>

            <p>
              <span class="text-weight-bold">
                Dirección
              </span><br>
              {{ $store.state.asistir_direccion }}
            </p>

            <p>
              <span class="text-weight-bold">
                Descripción
              </span><br>
              <span class="justify-center">
                {{ $store.state.asistir_descripcion }}
              </span>
            </p>

            <p>
              <span class="text-weight-bold">
                Capacidad máxima
              </span><br>
              {{ $store.state.asistir_cap_max }} personas
            </p>

            <p>
              <span class="text-weight-bold">
                Comida
              </span><br>
              {{ $store.state.asistir_comida }}
            </p>
          </div>

          <q-separator vertical></q-separator>

          <div class="col q-pl-md">
            <p>
              <span class="text-h4">
                Precio: {{ $store.state.precio }}€
              </span><br>

              <span class="text-h5">
                {{ $store.state.duracion }}
              </span>
            </p>

            <div class="center-button">
              <q-btn 
                rounded 
                class="bg-primary" 
                label="¡Compra tu entrada!"
                style="color: white;" 
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
  .center-button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 75%;
  }
</style>

<script>
  export default {
    name: 'Asistir'
  }
</script>
