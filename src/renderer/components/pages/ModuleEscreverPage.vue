<template>
    <div
        id="escrever"
        class="page-container escrever"
    >
        <navbar
            navbar-title="Módulo Escrever"
            :navbar-subtitle="'Temas'"
            :navbar-icon="getModuleImage"
        />         
        <div>      
            <p>{{ getModule.title }}</p>
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
        },        
        getModule(){
            console.log(this.$route.params)
            return this.$store.getters['WriteModule/getWriteModuleByRef'](this.$route.params.escrever_id)
        }
    }
}
</script>

<style>
    
</style>
