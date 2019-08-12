<template>
    <div
        id="escrever"
        class="page-container escrever"
    >
        <navbar
            :navbar-title="getModule.title"
            :navbar-subtitle="''"
            :navbar-icon="getModuleImage"
        />
        <div v-if="getModule.key === 'carta'">
            <editor></editor>
        </div>
        <!-- <div class="page-container-wrap-spacing">
            <p>{{ getModule.title }}</p>
        </div> -->
    </div>
</template>

<script>
import Navbar from '../ui/navbars/Navbar'
import Editor from '../ui/items/Editor'

export default {
    components: { Navbar,Editor},
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
