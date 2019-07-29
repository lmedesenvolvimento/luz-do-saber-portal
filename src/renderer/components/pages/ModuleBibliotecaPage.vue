<template>
    <div
        id="biblioteca"
        class="page-container biblioteca"
    >
        <navbar
            navbar-title="Biblioteca"
            :navbar-subtitle="''"
            :navbar-icon="getModuleImage"
        />
        <div v-if="ready" class="page-container-wrap-spacing">
            <b-card v-for="livro in livros" :key="livro.id" :title="livro.title">
                <div class="book-title">{{ livro.title }}</div>
                <async-image class="book-cover" :src="livro.cover_url ? livro.cover_url : null" :alt="`capa do livro ${livro.title}`" />
                <router-link :to="{ name: 'book', params: { livro_id: livro.id, livro: livro } }">Clica aqui</router-link>
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
        livros(){
            return this.$store.getters['Books/getBooks']
        },
        getModuleImage(){
            return require('@/assets/images/btn-books.png')
        },
        ...mapState('Modules', ['activeModule'])
    },
    created(){
        this.fetchBooks('biblioteca').then((livros) => {
            console.log(livros)
            this.ready = true
        })
    },
    methods: {
        registerUserProgress(module){
            return true
        },
        ...mapActions('Books', ['fetchBooks']),
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
