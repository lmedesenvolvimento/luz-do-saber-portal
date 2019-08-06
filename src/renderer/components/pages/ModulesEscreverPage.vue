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
            <b-row>
                <b-col
                    v-for="m in getModules"
                    :key="m.key"
                >
                    <router-link :to="{ name: 'write-module', params: { escrever_id: m.key } }">
                        <b-card>
                            {{ m.title }}
                        </b-card>
                    </router-link>
                </b-col>
            </b-row>
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
        getModules(){
            return this.$store.getters['WriteModule/getWriteModules']
        }
    }
}
</script>

<style>

</style>
