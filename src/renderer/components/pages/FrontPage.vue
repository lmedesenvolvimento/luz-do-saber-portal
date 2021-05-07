<template>
    <div id="frontpage" class="page-container comecar">
        <b-container fluid>
            <b-row align-v="center" align-h="center" class="flex-2 content">
                <b-container fluid>
                    <b-row class="m-5 flex-column" align-v="center" align-h="center">
                        <LogoAnimation :animated="loading" />
                    </b-row>

                    <transition name="fade" mode="out-in">
                        <div v-if="!canStart && !isAuthorized" class="d-flex justify-content-center">
                            <StartButton :on-click-start-button="onGameStart" />
                        </div>
                        <div v-else-if="!isAuthorized" key="login">
                            <SignupForm :on-submit="onSubmit" />
                        </div>
                        <div v-else-if="isAuthorized && !isVisibleLerSubModule" key="frontpage-modules">
                            <b-row align-v="center" class="justify-space-evenly">
                                <div class="icon-exit" @click="showExitModal"></div>
                                <ModuleLinkCard
                                    v-for="m in modules"
                                    :key="m.id"
                                    :slug="m.slug"
                                    :data="m"
                                    :toggle-visible-ler-sub-module="toggleVisibleLerSubModule"
                                />                                
                            </b-row>
                        </div>
                        <div v-else-if="isAuthorized && isVisibleLerSubModule" key="frontpage-ler">
                            <b-row align-v="center" align-h="center">
                                <a v-if="$context === 'fundamental'" class="d-block btn margin-prev" :class="{disabled : slide===1}" @click="clickPrev">
                                    <b-img center :src="require('@/assets/images/icons/escrever/icon-prev.png')" width="61" height="61" />
                                </a>
                                <transition name="fader" mode="out-in">
                                    <b-row v-if="slide === 1" :key="1" class="slider1">
                                        <div class="ml-2 mr-2">
                                            <ModuleLinkCard
                                                :data="read"
                                                :image="require('@/assets/images/btn-first-year.png')"
                                                :color="{ color: '#00963F' }"
                                                :label="$context === 'eja' ? 'Ciclo 1' : '1º Ano'"
                                                slug="ler-1"
                                                target-audience="primeiro-ano"
                                            />
                                        </div>
                                        <div v-if="$context === 'fundamental'" class="ml-2 mr-2">
                                            <ModuleLinkCard
                                                :data="read"
                                                :image="require('@/assets/images/btn-first-year.png')"
                                                :color="{ color: '#00963F' }"
                                                :label="$context === 'eja' ? 'EJA 1 complementar' : '1º Ano complementar'"
                                                slug="ler-1"
                                                target-audience="primeiro-ano-complementar"
                                            />
                                        </div>
                                        <div v-if="$context === 'fundamental'" class="ml-2 mr-2">
                                            <ModuleLinkCard
                                                :data="read"
                                                :image="require('@/assets/images/btn-second-year.png')"
                                                :color="{ color: '#00963F' }"
                                                :label="$context === 'eja' ? 'EJA 2' : '2º Ano'"
                                                slug="ler-2"
                                                target-audience="segundo-ano"
                                            />
                                        </div>
                                    </b-row>
                                    <b-row v-else :key="2" class="slider2">
                                        <div v-if="$context === 'fundamental'" class="ml-2 mr-2">
                                            <ModuleLinkCard
                                                :data="read"
                                                :image="require('@/assets/images/btn-second-year.png')"
                                                :color="{ color: '#00963F' }"
                                                :label="$context === 'eja' ? 'EJA 2 complementar' : '2º Ano complementar'"
                                                :complemento="true"
                                                slug="ler-2"
                                                target-audience="segundo-ano-complementar"
                                            />
                                        </div>
                                        <div v-if="$context === 'fundamental'" class="ml-2 mr-2">
                                            <ModuleLinkCard
                                                :data="read"
                                                :image="require('@/assets/images/btn-third-year.png')"
                                                :color="{ color: '#00963F' }"
                                                :label="'3º Ano'"
                                                slug="ler-3"
                                                target-audience="terceiro-ano"
                                            />
                                        </div>
                                        <div v-if="$context === 'fundamental'" class="ml-2 mr-2">
                                            <ModuleLinkCard
                                                :data="read"
                                                :image="require('@/assets/images/btn-third-year.png')"
                                                :color="{ color: '#00963F' }"
                                                :label="'3º Ano complementar'"
                                                slug="ler-3"
                                                target-audience="terceiro-ano-complementar"
                                            />
                                        </div>
                                    </b-row>
                                </transition>
                                <a v-if="$context === 'fundamental'" :class="{disabled : slide===2}" class="d-block btn margin-next" @click="clickNext">
                                    <b-img center :src="require('@/assets/images/icons/escrever/icon-next.png')" width="61" height="61" />
                                </a>
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
            <ls-alert-confirm-exit :show-exit-modal="isExitModalVisible"></ls-alert-confirm-exit>
        </b-container>
    </div>
</template>
<script>
import { find, filter } from 'lodash'
import { mapActions, mapState } from 'vuex'
import alerts from '@/components/alerts'

import LogoAnimation from '@/components/ui/LogoAnimation'
import StartButton from '@/components/ui/StartButton'
import SignupForm from '@/components/ui/SignupForm'
import ModuleLinkCard from '@/components/ui/ModuleLinkCard'

export default {
    components: {
        LogoAnimation,
        StartButton,
        SignupForm,
        ModuleLinkCard,
        ...alerts
    },
    data(){
        return {
            isVisibleLerSubModule: false,
            user: { name: '' },
            canStart: false,
            read: null,
            loading: false,
            isExitModalVisible: false,
            slide: 1
        }
    },
    computed: {
        isAuthorized(){
            return (this.currentUser && !this.currentUser.empty) ? true : false
        },
        isLoading(){
            return this.loading
        },
        ...mapState('Modules', ['modules']),
        ...mapState('User', ['currentUser'])
    },
    created(){
        if (this.isAuthorized) {
            this.getModules()
        }
    },
    mounted() {},
    methods: {
        clickPrev() {
            if(this.slide === 2) {
                this.slide--
            }
        },
        clickNext() {
            if(this.slide === 1) {
                this.slide++
            }
        },
        showExitModal(){           
            this.isExitModalVisible = !this.isExitModalVisible
        },        
        onGameStart(){
            this.canStart = true
        },
        onSubmit(){
            this.getModules()
        },
        toggleVisibleLerSubModule(){
            this.isVisibleLerSubModule = !this.isVisibleLerSubModule
        },
        getModules() {
            this.loading = true
            this.fetchModules().then(({ modulos }) => {
                this.read = find(modulos, { slug: 'ler' })
                this.modules.pop()
                setTimeout(() => {
                    this.loading = false
                }, 3000)
            })
        },
        ...mapActions('Modules',['fetchModules']),
        ...mapActions('User',['createUserDatabase', 'destroyUserDatabase']),
    }
}
</script>

<style lang="scss" scoped>
#frontpage{
    position: relative;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    > .container-fluid {
        margin: auto;
    }
}

.fader-enter-active, .fader-leave-active {
  transition: opacity .2s;
}
.fader-enter, .fader-leave-to {
  opacity: 0;
}

.icon-exit{
    position: absolute;
    top: 4%;
    right: 4%;
}

.margin-prev {
    margin-right: 100px;
}

.margin-next {
    margin-left: 100px;
}

.disabled {
   filter: grayscale(100%);  
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
