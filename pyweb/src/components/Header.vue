<template>
    <q-header elevated class="bg-primary">
        <q-toolbar>
            <img
                alt="PycampEs-logo"
                src="@/assets/pycamp-logo.png"
                class="logo"
            />
            <Menu />
        </q-toolbar>
    </q-header>
</template>

<script>
import Menu from "./Menu.vue";
export default {
    name: "Header",
    components: { Menu },
};
</script>

<style scoped>
header {
    box-shadow: 4px black;
}
.q-toolbar {
    height: 85px;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
}
.logo {
    height: 45px;
    width: auto;
}
</style>
