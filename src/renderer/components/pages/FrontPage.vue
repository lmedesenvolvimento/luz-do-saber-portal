<template>
    <div id="frontpage" class="page-container comecar">
        <b-container fluid>
            <b-row align-v="center" align-h="center" class="flex-2 content">
                <b-container fluid>
                    <b-row class="m-5" align-v="center" align-h="center">
                        <img class="front-page-logo" src="@/assets/images/logo.png" alt="Logo Luz do Saber">
                    </b-row>

                    <transition name="fade" mode="out-in">
                        <div v-if="!canStart && !isAuthorized" class="d-flex justify-content-center">
                            <StartButton :on-click-start-button="onGameStart" />
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
    </div>
</template>
<script>
import { find, filter } from 'lodash'
import { mapActions, mapState } from 'vuex'

import StartButton from '@/components/ui/StartButton'
import SignupForm from '@/components/ui/SignupForm'
import ModuleLinkCard from '@/components/ui/ModuleLinkCard'

export default {
    components: {
        StartButton,
        SignupForm,
        ModuleLinkCard
    },
    data(){
        return {
            isVisibleLerSubModule: false,
            user: { name: '' },
            canStart: false,
            read: null,
            errMsg: '',
        }
    },
    computed: {
        isAuthorized(){
            return this.currentUser ? true : false
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
        toggleVisibleLerSubModule(){
            this.isVisibleLerSubModule = !this.isVisibleLerSubModule
        },
        onGameStart() {
            this.canStart = !this.canStart;
        },
        ...mapActions('Modules',['fetchModules']),
        ...mapActions('User',['createUserDatabase', 'destroyUserDatabase']),
    }
}
</script>

<style lang="scss">
#frontpage{
    position: absolute;
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
