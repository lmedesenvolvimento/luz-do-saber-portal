<template>
    <div id="frontpage" class="page-container comecar">
        <b-container fluid>
            <b-row align-v="center" align-h="center" class="flex-2 content">
                <b-container fluid>
                    <b-row class="m-5 flex-column" align-v="center" align-h="center">
                        <div class="frontpage-logo" :class="{'animated': isLoading}"></div>
                        <div class="front-page-logo-title"></div>
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
                                <div class="ml-5 mr-5">
                                    <ModuleLinkCard
                                        :data="read"
                                        :image="require('@/assets/images/btn-first-year.png')"
                                        :color="{ color: '#00963F' }"
                                        label="1º Ano"
                                        slug="ler-1"
                                        target-audience="primeiro-ano"
                                    />
                                </div>
                                <div class="ml-5 mr-5">
                                    <ModuleLinkCard
                                        :data="read"
                                        :image="require('@/assets/images/btn-second-year.png')"
                                        :color="{ color: '#00963F' }"
                                        label="2º Ano"
                                        slug="ler-2"
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
            <ls-alert-confirm-exit :show-exit-modal="isExitModalVisible"></ls-alert-confirm-exit>
        </b-container>
    </div>
</template>
<script>
import { find, filter } from 'lodash'
import { mapActions, mapState } from 'vuex'
import alerts from '@/components/alerts'

import StartButton from '@/components/ui/StartButton'
import SignupForm from '@/components/ui/SignupForm'
import ModuleLinkCard from '@/components/ui/ModuleLinkCard'

export default {
    components: {
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
            isExitModalVisible: false
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
    methods: {
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
.icon-exit{
    position: absolute;
    top: 4%;
    right: 4%;
}
</style>
