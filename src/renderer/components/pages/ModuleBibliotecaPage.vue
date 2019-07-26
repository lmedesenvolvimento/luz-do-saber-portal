<template>
    <div
        id="biblioteca"
        class="page-container biblioteca"
    >
        <navbar
            navbar-title="Escrever"
            :navbar-subtitle="''"
            :navbar-icon="getModuleImage"
        />
        <div class="page-container-wrap-spacing">
            <b-card title="Lorem ipsums">
                <p>Anim veniam esse excepteur nostrud ad eiusmod. Quis et irure ipsum fugiat quis ullamco enim eiusmod nulla. Ad sunt aliqua pariatur ut commodo laborum quis tempor.</p>
            </b-card>
        </div>
    </div>
</template>

<script>
import Navbar from '../ui/navbars/Navbar'
export default {
    components: { Navbar },
    computed: {
        getModuleImage(){
            return require('@/assets/images/btn-books.png')
        }
    }
}
</script>

<style>

</style>
