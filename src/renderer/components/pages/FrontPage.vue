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
                        <div v-else-if="isAuthorized && !isVisibleSubModule" key="frontpage-modules">
                            <b-row align-v="center" class="justify-space-evenly">
                                <div class="icon-exit" @click="showExitModal"></div>
                                <ModuleLinkCard
                                    v-for="m in modules"
                                    :key="m.id"
                                    :slug="m.slug"
                                    :data="m"
                                    :toggle-visible-sub-module="toggleVisibleSubModule"
                                />                                
                            </b-row>
                        </div>
                        <div v-else-if="isAuthorized && isVisibleSubModule" key="frontpage-ler">
                            <b-row align-v="center" align-h="center">
                                <a v-if="hasPagination" class="d-block btn margin-prev" :class="{disabled : slide === 0}" @click="clickPrev">
                                    <b-img center :src="require('@/assets/images/icons/escrever/icon-prev.png')" width="61" height="61" />
                                </a>
                                <transition name="fader" mode="out-in">
                                    <b-row class="slider">
                                        <div v-for="targetAudience in currentPage" :key="targetAudience.id" class="ml-2 mr-2">
                                            <ModuleLinkCard
                                                :data="targetAudience"
                                                :image="getImage(targetAudience)"
                                                :color="getColor(targetAudience)"
                                                :label="targetAudience.title"
                                                :slug="targetAudience.slug"
                                                :target-audience="targetAudience.slug"
                                            />
                                        </div>
                                    </b-row>
                                </transition>
                                <a v-if="hasPagination" :class="{disabled : slide === pagination.length - 1}" class="d-block btn margin-next" @click="clickNext">
                                    <b-img center :src="require('@/assets/images/icons/escrever/icon-next.png')" width="61" height="61" />
                                </a>
                                <b-col cols="12" class="my-1">
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
            subModules: {},
            user: { name: '' },
            canStart: false,
            read: null,
            loading: false,
            isExitModalVisible: false,
            slide: 0,
            targetAudiences: [],
            pagination: [],
            hasPagination: false
        }
    },
    computed: {
        isAuthorized(){
            return (this.currentUser && !this.currentUser.empty) ? true : false
        },
        isLoading(){
            return this.loading
        },
        isVisibleSubModule() {
            return Object.values(this.subModules).some((visible) => visible)
        },
        currentPage() {
            return this.pagination[this.slide]
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
        showExitModal(){           
            this.isExitModalVisible = !this.isExitModalVisible
        },        
        onGameStart(){
            this.canStart = true
        },
        onSubmit(){
            this.getModules()
        },
        toggleVisibleSubModule(module){
            Vue.set(this.subModules, module, true)
            this.fetchTargetAudiences(module).then(({ theme_audiences}) => {
<<<<<<< HEAD
                this.targetAudiences = uniqBy(theme_audiences.map((el) => ({ ...el, module_slug: module})), 'id').filter(({status}) => status !== 'inactive').sort(this.sortByOrder)
                console.log(this.targetAudiences)
=======
                this.targetAudiences = uniqBy(theme_audiences.map((el) => ({ ...el, module_slug: module})), 'id').filter(({status}) => status !== 'inactive')
>>>>>>> ec460b47 (Merged in fix/module-routes-history (pull request #290))
                this.hasPagination = this.targetAudiences.length > 5
                this.pagination = this.divideInPages(this.targetAudiences, 5, 4)
            })
        },
        hideSubModule() {
            for(const module in this.subModules) {
                this.subModules[module] = false
            }
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
        getColor(targetAudience) {
            switch (targetAudience.module_slug) {
            case 'ler':
                return { color: '#00963F' }
            default:
                return { color: '#fff' }
            }
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
<<<<<<< HEAD
        sortByOrder(a, b) {
            return a.order - b.order

        },
=======
>>>>>>> ec460b47 (Merged in fix/module-routes-history (pull request #290))
        getImage(targetAudience) {
            return targetAudience.cover_full_url
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
