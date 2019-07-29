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
            <b-row>
                <b-col v-for="livro in activeModule.livros" :key="livro.id" sm="4">
                    <router-link :to="{ name: 'book', params: { livro_id: livro.id, livro: livro } }">
                        <b-card class="book-card">
                            <div class="book-title">{{ livro.title }}</div>
                            <async-image class="book-cover" :src="livro.cover_url ? livro.cover_url : null" :alt="`capa do livro ${livro.title}`" />
                        </b-card>
                    </router-link>
                </b-col>
            </b-row>
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

<style lang="scss">
    .book-cover{
        max-width: 100px;
    }

    .book-title{
        display: flex;
        align-self: center;
        font-size: 1.2rem;
        text-align: center;
        color: transparentize($color: #000000, $amount: 0.5);
        padding: 10px;
    }

    .book-card{
        border-radius: 20px;

        .card-body{
            display: grid;
            grid-template-columns: 1fr 1fr;
            padding: 4px;
            height: 200px;
        }

        .book-cover{
            margin: 0;
        }

        .image.book-cover{
            max-width: 100%;
            height: auto;
            position: relative;
            overflow: hidden;
            border-top-right-radius: 16px;
            border-bottom-right-radius: 16px;

            img{
                height: 100%;
                width: 100%;
            }
        }
    }
</style>
