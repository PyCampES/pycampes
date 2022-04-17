<template>
    <q-list>
        <q-item><a href="#el-evento">El Evento</a></q-item>
        <q-item>
            <a href="#ediciones-anteriores">Ediciones Anteriores</a>
        </q-item>
        <q-item><a href="#asistir">Asistir</a></q-item>
        <q-item><a href="#mas-informacion">Más Información</a></q-item>
    </q-list>
</template>

<script>
export default {};
</script>

<style scoped>
.q-list {
    display: flex;
    flex-direction: column;
}
.q-item a {
    color: inherit;
    text-decoration: none;
    font-weight: bold;
    font-size: 1.3rem;
}
@media (min-width: 1080px) {
    .q-list {
    flex-direction: row;
}
}
</style>
