<template>
    <div id="escrever" class="page-container escrever">
        <navbar
            :navbar-title="getModule.title"
            :navbar-subtitle="''"
            :navbar-icon="getModuleImage"
        />
        <div v-if="getModule.key === 'jornal'">
            <journal></journal>
        </div>
        <div v-else-if="getModule.key === 'cartao'">
            <convite></convite>
        </div>
        <div v-else-if="getModule.key === 'lista'">
            <lista></lista>
        </div>
        <div v-else-if="getModule.key === 'gibi'">
            <gibi></gibi>
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
import Editor from '../ui/items/Editor'
import Convite from '../ui/items/Convite'
import Lista from '../ui/items/Lista'
import Gibi from '../ui/items/Gibi'
export default {
    components: { Navbar, Journal, Editor, Convite, Lista, Gibi },
    computed: {
        getModuleImage() {
            return require('@/assets/images/btn-write.png')
        },
        getModule() {
            console.log(this.$route.params)
            return this.$store.getters['WriteModule/getWriteModuleByRef'](
                this.$route.params.escrever_id
            )
        }
    }
}
</script>
<style></style>
