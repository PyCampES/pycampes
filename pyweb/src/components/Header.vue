<template>
    <q-header elevated class="bg-primary">
        <q-toolbar>
        <a href= "#banner-home">
            <img
                alt="PycampEs-logo"
                src="@/assets/pycamp-logo.png"
                class="logo"
            />
        </a>
            
            <q-btn
                flat
                dense
                round
                @click="menuOpen = !menuOpen"
                aria-label="Menu"
                icon="menu"
                id="hamburger"
            />
            <Menu id="menu" />
        </q-toolbar>
        <Menu v-if="menuOpen" />
    </q-header>
</template>

<script>
import Menu from "./Menu.vue";
export default {
    name: "Header",
    components: { Menu },
    data() {
        return {
            menuOpen: false
        }
    }
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
    padding: 16px;
}
.logo {
    height: 45px;
    width: auto;
}
#menu {
    display: none;
}
@media (min-width: 1080px) {
    #hamburger {
        display: none;
    }
    #menu {
        display: flex;
    }
}
</style>
