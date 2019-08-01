<template>
    <div
        id="escrever"
        class="page-container escrever"
    >
        <navbar
            navbar-title="Escrever"
            :navbar-subtitle="''"
            :navbar-icon="getModuleImage"
        />
        <div class="page-container-wrap-spacing">
            <p>Anim veniam esse excepteur nostrud ad eiusmod. Quis et irure ipsum fugiat quis ullamco enim eiusmod nulla. Ad sunt aliqua pariatur ut commodo laborum quis tempor.</p>
            <router-link :to="{ name: 'letter' }">Carta</router-link>
        </div>
    </div>
</template>

<script>
import Navbar from '../ui/navbars/Navbar'
export default {
    components: { Navbar },
    computed: {
        getModuleImage(){
            return require('@/assets/images/btn-write.png')
        }
    }
}
</script>

<style>

</style>
