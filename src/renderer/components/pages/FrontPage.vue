<template>
    <div id="frontpage" class="page-container">        
        <main>
            <b-container fluid>
                <b-row align-v="center" align-h="center" class="flex-2 content">          
                    <b-container>
                        <b-row class="m-5" align-v="center" align-h="center">
                            <img class="front-page-logo" src="@/assets/images/logo-1.png" alt="Logo Luz do Saber">
                        </b-row>

                        <transition name="fade" mode="out-in">
                            <div v-if="!authorized" key="login">
                                <b-form @submit.prevent="submitLogin">
                                    <b-card no-body class="mx-5">
                                        <h4 slot="header">Login</h4>
                                        <b-card-body>
                                            <b-form-group
                                                id="input-group-name"
                                                label="Informe seu nome:"
                                                label-for="input-name"
                                            >
                                                <b-form-input
                                                    id="input-name"
                                                    v-model="user.name"
                                                    v-focus="true"
                                                    type="text"
                                                    required
                                                ></b-form-input>
                                            </b-form-group>     
                                        </b-card-body>
                                        <b-card-footer>
                                            <b-button type="submit" variant="primary" class="mt-3">Confirmar</b-button>
                                        </b-card-footer>                               
                                    </b-card>
                                </b-form>
                            </div>
                            <div v-else-if="authorized && !isVisibleLerSubModule" key="frontpage-modules">
                                <b-row align-v="center" align-h="center">
                                    <b-col v-for="m in modules" :key="m.id">
                                        <a 
                                            v-if="m.slug === 'ler'"
                                            class="clean-links" 
                                            @click="toggleVisibleLerSubModule"
                                        >
                                            <vue-circle
                                                class="m-5"
                                                :label="m.title"
                                                :image="getModuleImage(m)"
                                                :progress="50"
                                                :color="getModuleColor(m)"
                                            />
                                        </a>
                                        <router-link 
                                            v-else
                                            class="clean-links" 
                                            :to="{ name: 'module', params: { module_slug: m.slug } }" 
                                            replace
                                        >
                                            <vue-circle
                                                class="m-5"
                                                :label="m.title"
                                                :image="getModuleImage(m)"
                                                :progress="50"
                                                :color="getModuleColor(m)"
                                            />
                                        </router-link>
                                    </b-col>
                                </b-row>                        
                            </div>
                            <div v-else-if="authorized && isVisibleLerSubModule" key="frontpage-ler">
                                <b-row align-v="center" align-h="center">
                                    <div>
                                        <router-link 
                                            class="clean-links" 
                                            :to="{ name: 'module', params: { module_slug: 'ler' } }" 
                                            replace
                                        >
                                            <vue-circle
                                                class="m-5"
                                                :label="'1º Ano'"
                                                :image="require('@/assets/images/btn-first-year.png')"
                                                :progress="50"
                                                :color="{ color: '#00963F' }"
                                            />
                                        </router-link>
                                    </div>                                    
                                    <div>
                                        <router-link 
                                            class="clean-links" 
                                            :to="{ name: 'module', params: { module_slug: 'ler' } }" 
                                            replace
                                        >
                                            <vue-circle
                                                class="m-5"
                                                :label="'2º Ano'"
                                                :image="require('@/assets/images/btn-second-year.png')"
                                                :progress="50"
                                                :color="{ color: '#00963F' }"
                                            />
                                        </router-link>
                                    </div>                                    
                                    <b-col cols="12" class="my-1">
                                        <a class="d-block btn" @click="toggleVisibleLerSubModule">
                                            <b-img center :src="require('@/assets/images/btn-close.png')" width="51" height="51" />
                                        </a>
                                    </b-col>
                                </b-row>
                            </div>
                        </transition>
                    </b-container>
                </b-row>
            </b-container>
        </main>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import VueCircle from '@/components/ui/CircleProgress'

import db, { createDatabase } from '@/services/Session'

export default {
    components: {
        VueCircle
    },
    data(){
        return {
            authorized: false,
            isVisibleLerSubModule: false,
            user: { name: '' }
        }
    },
    computed: {                
        ...mapState('Modules', ['modules'])
    },
    created(){
        this.fetchModules()
        this.authorized = db.get('data').value() ? true : false
    },
    methods: {
        submitLogin(){
            createDatabase(this.user.name)
            this.authorized = true
        },
        toggleVisibleLerSubModule(){
            this.isVisibleLerSubModule = !this.isVisibleLerSubModule
        },
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
