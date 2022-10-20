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
                        <div v-else key="frontpage-modules">
                            <b-row align-v="center" align-h="center">
                                <a v-if="hasPagination" class="d-block btn margin-prev" :class="{disabled : slide === 0}" @click="clickPrev">
                                    <b-img center :src="require('@/assets/images/icons/escrever/icon-prev.png')" width="61" height="61" />
                                </a>
                                <transition name="fader" mode="out-in">
                                    <b-row class="slider">
                                        <div v-for="module in currentPage" :key="module.slug" class="ml-2 mr-2">
                                            <ModuleLinkCard
                                                v-bind="camelCaseKeys(module)"
                                                @toggle-visible-sub-module="toggleVisibleSubModule"
                                            />
                                        </div>
                                    </b-row>
                                </transition>
                                <a v-if="hasPagination" :class="{disabled : slide === pagination.length - 1}" class="d-block btn margin-next" @click="clickNext">
                                    <b-img center :src="require('@/assets/images/icons/escrever/icon-next.png')" width="61" height="61" />
                                </a>
                                <b-col v-if="isVisibleSubModule" cols="12" class="my-1">
                                    <a class="d-block btn" @click="hideSubModule">
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
import { find, uniqBy } from 'lodash'
import Vue from 'vue'
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
            user: { name: '' },
            canStart: false,
            loading: false,
            isExitModalVisible: false,
            slide: 0,
            targetAudiences: [],
            pagination: [],
            isVisibleSubModule: false,
        }
    },
    computed: {
        isAuthorized(){
            return (this.currentUser && !this.currentUser.empty) ? true : false
        },
        isLoading(){
            return this.loading
        },
        currentPage() {
            return this.pagination[this.slide]
        },
        hasPagination() {
            return this.pagination.length > 1
        },
        activeModules() {
            return this.modules.filter(({status}) => status !== 'inactive')
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
        clickPrev() {
            if(this.slide > 0) this.slide--
        },
        clickNext() {
            if(this.slide < this.pagination.length - 1) this.slide++
        },
        showExitModal() {
            this.isExitModalVisible = !this.isExitModalVisible
        },
        onGameStart(){
            this.canStart = true
        },
        onSubmit(){
            this.getModules()
        },
        toggleVisibleSubModule(module){
            this.fetchTargetAudiences(module).then(({ theme_audiences }) => {
                this.slide = 0
                this.isVisibleSubModule = true
                this.targetAudiences = uniqBy(theme_audiences.map((el) => ({ ...el, module_slug: module})), 'id').filter(({status}) => status !== 'inactive').sort(this.sortByOrder)
                this.pagination = this.divideInPages(this.targetAudiences, 5, 4)
            })
        },
        hideSubModule() {
            this.slide = 0
            this.isVisibleSubModule = false
            this.pagination = this.divideInPages(this.activeModules, 5, 4)
        },
        getModules() {
            this.loading = true
            this.fetchModules().then(({ modulos }) => {
                this.pagination = this.divideInPages(this.activeModules, 5, 4)
                setTimeout(() => {
                    this.loading = false
                }, 3000)
            })
        },
        calcPagination(itemArray, max) {
            return itemArray.length > max
        },
        divideInPages(itemArray, max, chunk) {
            if(this.calcPagination(itemArray, max)) {
                const pagesArray = []
                for(let i = 0; i < itemArray.length; i+=chunk)
                    pagesArray.push(itemArray.slice(i, i+chunk))
                return pagesArray
            }
            return [itemArray]
        },
        sortByOrder(a, b) {
            return a.order - b.order
        },
        camelCaseKeys(ob) {
            const n = {}
            Object.keys(ob).forEach((k) => {
                n[k.replace(/([-_][a-z])/ig, ($1) => {
                    return $1.toUpperCase()
                        .replace('-', '')
                        .replace('_', '')
                })] = ob[k]
            })
            return n
        },
        ...mapActions('Modules',['fetchModules', 'fetchTargetAudiences']),
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

// .margin-prev {
//     margin-right: 100px;
// }

// .margin-next {
//     margin-left: 100px;
// }

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
