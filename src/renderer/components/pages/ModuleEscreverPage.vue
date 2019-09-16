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
        <div v-if="getModule.key === 'jornal'">
            <journal></journal>
        </div>
        <div v-else-if="getModule.key === 'lista'">
            <journal2></journal2>
        </div>        
        <div v-else class="page-container-wrap-spacing">    
            <div v-if="getModule.key === 'editor'">
                <editor></editor>
            </div>
            <div v-else class="page-container-wrap-spacing">
                <p>{{ getModule.title }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '../ui/navbars/Navbar'
import Journal from '../ui/items/Journal'
import Journal2 from '../ui/items/Journal2'
import Editor from '../ui/items/Editor'
export default {
    components: { Navbar, Journal, Journal2 ,Editor},
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
