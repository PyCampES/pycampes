<template>
  <section id="el-evento">
    <div class="q-pa-xl">
      <div class="column items-center">
        <div class="col" style="width: 120vh">
          <p>
            <span
              class="text-h5 text-weight-bold"
              style="color: var(--q-primary)"
              >EVENTO</span
            >
          </p>
          <p class="text-justify">
            {{ $store.state.evento }}
          </p>
        </div>

        <div class="col q-pt-sm" style="width: 120vh">
          <div class="row justify-center q-gutter-md">
            <q-card class="col card-border">
              <q-card-section align="center">
                <img
                  src="@/assets/python_comunidad.svg"
                  class="q-pt-sm"
                  width="100"
                  height="100"
                />

                <div class="text-h6 text-weight-bold q-pt-sm">COMUNIDAD</div>

                <p class="q-pt-sm">
                  {{ $store.state.lorem }}
                </p>
              </q-card-section>
            </q-card>

            <q-card class="col card-border">
              <q-card-section align="center">
                <img
                  src="@/assets/open_source.svg"
                  class="q-pt-sm"
                  width="100"
                  height="100"
                />

                <div class="text-h6 text-weight-bold q-pt-sm">OPEN SOURCE</div>

                <p class="q-pt-sm">
                  {{ $store.state.lorem }}
                </p>
              </q-card-section>
            </q-card>

            <q-card class="col card-border">
              <q-card-section align="center">
                <img
                  src="@/assets/naturaleza.svg"
                  class="q-pt-sm"
                  width="100"
                  height="100"
                />

                <div class="text-h6 text-weight-bold q-pt-sm">NATURALEZA</div>

                <p class="q-pt-sm">
                  {{ $store.state.lorem }}
                </p>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <div class="col q-pt-md" style="width: 120vh">
          <p>
            <span
              class="text-h6 text-weight-bold"
              style="color: var(--q-primary)"
              >¿A QUIÉN VA DIRIGIDO?</span
            >
          </p>
          <p class="text-justify">
            {{ $store.state.evento }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card-border {
  border-style: solid;
  border-color: var(--q-primary);
  border-radius: 15px !important;
}
</style>

<script>
export default {
  name: "Evento",
};
</script>
