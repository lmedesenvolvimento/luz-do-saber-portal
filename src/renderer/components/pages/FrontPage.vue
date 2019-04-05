<template>
    <div id="frontpage" class="page-container">        
        <main>
            <b-container fluid>
                <b-row align-v="center" align-h="center" class="flex-2 content">          
                    <b-container>
                        <b-row class="m-5" align-v="center" align-h="center">
                            <img class="front-page-logo" src="@/assets/images/logo-1.png" alt="Logo Luz do Saber">
                        </b-row>

                        <b-row align-v="center" align-h="center">
                            <div v-for="m in modules" :key="m.id">
                                <router-link class="clean-links" :to="{ name: 'module', params: { module_slug: m.slug } }" replace>
                                    <!-- {{ m.title }} -->
                                    <vue-circle
                                        class="m-5"
                                        :label="m.title"
                                        :image="getModuleImage(m)"
                                        :progress="50"
                                        :color="getModuleColor(m)"
                                    />
                                </router-link>
                            </div>
                        </b-row>
                    </b-container>
                </b-row>
            </b-container>
        </main>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import VueCircle from './CircleProgress'

export default {
    components: {
        VueCircle
    },
    computed: {        
        ...mapState('Modules', ['modules'])
    },
    created(){
        this.fetchModules()
        console.log(this.modules);
        
    },
    methods: {
        getModuleImage(module){
            switch (module.slug) {
            case 'comecar':
                return require('@/assets/images/btn-start.png')
            case 'ler':
                return require('@/assets/images/btn-read.png')
            case 'escrever':
                return require('@/assets/images/btn-write.png')
            default:
                break;
            }
        },
        getModuleColor(module){
            switch (module.slug) {
            case 'comecar':
                return  { color: '#EC2727' }
            case 'ler':
                return { color: '#00963F' }
            case 'escrever':
                return { color: '#007CB2' }
            default:
                break;
            }
        },
        ...mapActions('Modules',['fetchModules'])
    }
}
</script>

<style>

</style>
