<template>
    <div
        id="biblioteca"
        class="page-container biblioteca"
    >
        <navbar
            navbar-title="Escrever"
            :navbar-subtitle="''"
            :navbar-icon="getModuleImage"
        />
        <div v-if="ready" class="page-container-wrap-spacing">
            <b-card v-for="livro in activeModule.livros" :key="livro.id" title="Lorem ipsums">
                <div class="book-title">{{ livro.title }}</div>
                <async-image class="book-cover" :src="livro.cover_url" :alt="`capa do livro ${livro.title}`" />
            </b-card>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ui from '@/components/ui'
import Navbar from '../ui/navbars/Navbar'
import AsyncImage from '@ui/AsyncImage'

export default {
    components: { 
        ...ui,
        Navbar,
        AsyncImage,
    },
    data(){
        return {
            ready: false
        }
    },
    computed: {
        getModuleImage(){
            return require('@/assets/images/btn-books.png')
        },
        ...mapState('Modules', ['activeModule'])
    },
    created(){
        this.fetchModule('biblioteca').then((modulo) => {
            this.ready = true
            console.log(this.activeModule)
        })
    },
    methods: {
        registerUserProgress(module){
            return true
        },
        ...mapActions('Modules', ['fetchModule', 'destroyModule']),
    },
}
</script>

<style>
    .book-cover{
        max-width: 100px;
    }

    .book-title{
        display: inline;
    }
</style>
