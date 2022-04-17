<template>
  <!-- <section id="becas" style="background-color: var(--q-primary); opacity: 0.5;"> -->
  <!-- AÑADIR FONDO TRASLUCIDO DEL COLOR PRIMARIO A TODA LA SECCION -->
  <section id="becas">
    <div class="q-pa-xl">
      <div class="column items-center">
        <div class="col" style="width: 120vh;">
          <p>
            <span class="text-h5 text-weight-bold" style="color: var(--q-primary);">Becas</span>
          </p>
        </div>

        <div class="col" style="width: 120vh;">
          <q-timeline :layout="layout" color="primary">
            <q-timeline-entry
              title="Event Title"
              subtitle="February 22, 1986"
              side="left"
              icon="delete"
            >
              <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
            </q-timeline-entry>

            <q-timeline-entry
              title="Event Title"
              subtitle="February 21, 1986"
              side="right"
              icon="delete"
            >
              <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
            </q-timeline-entry>

            <q-timeline-entry
              title="Event Title"
              subtitle="February 22, 1986"
              side="left"
              icon="delete"
            >
              <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
            </q-timeline-entry>   
          </q-timeline>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>

<script>
  import { useQuasar } from 'quasar'
  import { computed } from 'vue'

  export default {
    name: 'Becas',

    setup () {
      const $q = useQuasar()

      return {
        layout: computed(() => {
          return $q.screen.lt.sm ? 'dense' : ($q.screen.lt.md ? 'comfortable' : 'loose')
        })
      }
    }
  }
</script>
