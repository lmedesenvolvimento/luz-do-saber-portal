<template>
    <div id="frontpage" class="page-container comecar">
        <main>
            <b-container fluid>
                <b-row align-v="center" align-h="center" class="flex-2 content">
                    <b-container fluid>
                        <b-row class="m-5" align-v="center" align-h="center">
                            <transition name="fade" mode="out-in">
                                <div v-if="isLoading" key="logo" class="front-page-logo-animation"></div>
                                <img
                                    v-else
                                    key="logo"
                                    class="front-page-logo"
                                    :src="require('@/assets/images/logo.png')"
                                    alt="Logo Luz do Saber"
                                >
                            </transition>
                        </b-row>

                        <transition name="fade" mode="out-in">
                            <div v-if="!canStart && !isAuthorized" class="d-flex justify-content-center">
                                <div class="mx-5 front-page-login">
                                    <b-card-body>
                                        <div class="card--display btn-play-container" @click="gameStart">
                                            <img class="btn-play" src="@/assets/images/icons/btn-play.png" alt="Botão jogar">
                                            <b-card
                                                no-body
                                            >
                                                <b-card-body>
                                                    <span class="span-spacing">jogar</span>
                                                </b-card-body>
                                            </b-card>
                                        </div>
                                    </b-card-body>
                                </div>
                            </div>
                            <div v-else-if="!isAuthorized" key="login">
                                <SignupForm />
                            </div>
                            <div v-else-if="isAuthorized && !isVisibleLerSubModule" key="frontpage-modules">
                                <b-row align-v="center" align-h="center">
                                    <div class="icon-exit" @click="destroyUserDatabase"></div>
                                    <ModuleLinkCard
                                        v-for="m in modules"
                                        :key="m.id"
                                        :data="m"
                                        :toggle-visible-ler-sub-module="toggleVisibleLerSubModule"
                                    />
                                </b-row>
                            </div>
                            <div v-else-if="isAuthorized && isVisibleLerSubModule" key="frontpage-ler">
                                <b-row align-v="center" align-h="center">
                                    <div>
                                        <ModuleLinkCard
                                            label="1º Ano"
                                            :data="read"
                                            :image="require('@/assets/images/btn-first-year.png')"
                                            :color="{ color: '#00963F' }"
                                            target-audience="primeiro-ano"
                                        />
                                    </div>
                                    <div>
                                        <ModuleLinkCard
                                            :data="read"
                                            :label="'2º Ano'"
                                            :image="require('@/assets/images/btn-second-year.png')"
                                            :color="{ color: '#00963F' }"
                                            target-audience="segundo-ano"
                                        />
                                    </div>
                                    <b-col cols="12" class="my-1">
                                        <a class="d-block btn" @click="toggleVisibleLerSubModule">
                                            <b-img center :src="require('@/assets/images/btn-close.png')" width="61" height="61" />
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
import { find, filter } from 'lodash'
import { mapActions, mapState } from 'vuex'
<<<<<<< HEAD
import VueCircle from '@/components/ui/CircleProgress'
import { setTimeout } from 'timers';
=======

import SignupForm from '@/components/ui/SignupForm'
import ModuleLinkCard from '@/components/ui/ModuleLinkCard'
>>>>>>> master

export default {
    components: {
        SignupForm,
        ModuleLinkCard
    },
    data(){
        return {
            isVisibleLerSubModule: false,
            user: { name: '' },
            canStart: false,
            read: null,
<<<<<<< HEAD
            loading: false
=======
            errMsg: '',
>>>>>>> master
        }
    },
    computed: {
        isAuthorized(){
            return this.currentUser ? true : false
        },
        isLoading(){
            return this.loading || ( this.user.name  && !this.modules.length )
        },
        ...mapState('Modules', ['modules']),
        ...mapState('User', ['currentUser'])
    },
    created(){
        this.fetchModules().then(({ modulos }) => {
            this.read = find(modulos, { slug: 'ler' })
        })
    },
    methods: {
<<<<<<< HEAD
        submitLogin(){
            this.createUserDatabase(this.user)

            this.loading = true

            setTimeout(() => {
                this.loading = false
            }, 5000)
        },
=======
>>>>>>> master
        toggleVisibleLerSubModule(){
            this.isVisibleLerSubModule = !this.isVisibleLerSubModule
        },
        gameStart() {
            this.canStart = !this.canStart;

            let audio = new Audio();
            audio.src = require('@/assets/audios/1-bem-vindo.mp3');
            audio.play();

            window.setTimeout(function() {
                let audio = new Audio();
                audio.src = require('@/assets/audios/2-seu-nome.mp3');
                audio.play();
            }, 3500);

            window.clearTimeout();

<<<<<<< HEAD
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
        getProgressModule(m, target_audience){
            const themes = this.getProgressThemesByModuleId(m, target_audience)
            console.log(themes)
            const total = ( filter(themes, { completed: true }).length / m.themes.length ) * 100
            return  total || 5
        },
        getProgressThemesByModuleId(module, target_audience){
            return this.$store.getters['Pointings/getThemesByModuleId'](module.id, target_audience)
=======
>>>>>>> master
        },
        ...mapActions('Modules',['fetchModules']),
        ...mapActions('User',['createUserDatabase', 'destroyUserDatabase']),
        ...mapActions('Pointings', ['add'])
    }
}
</script>

<style lang="scss">
.btn-play-container {
    position: relative;
    cursor: pointer;
}
.btn-play {
    position: absolute;
    z-index: 10;
    right: 100px;
    top: -4px;
    width: 92px;
    height: 92px;
}
.span-spacing {
    padding-left: 50px;
}

.err-msg{
    color: red;
}

.icon-exit{
    position: absolute;
    top: 4%;
    right: 4%;
}
</style>
