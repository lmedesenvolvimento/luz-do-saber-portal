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
        <div class="page-container-wrap-spacing--sm">
            <div>
                <b-row>
                    <b-col sm="4">
                        <input
                            v-model="searchBook"
                            class="book-search" 
                            type="text" 
                            placeholder="Procurar por..."
                        />
                    </b-col>
                </b-row>
            </div>            
            <b-row is="transition-group" name="book-animation">
                <div v-for="livro in livros" :key="livro.id" class="book-container">
                    <div v-if="containSearch(livro.title)" class="book-sub-container">
                        <router-link :to="{ name: 'book', params: { livro_id: livro.id } }">
                            <b-card class="book-card">
                                <div class="book-title">{{ livro.title }}</div>
                                <async-image class="book-cover" :src="livro.cover_url ? livro.cover_url : null" :alt="`capa do livro ${livro.title}`" />
                            </b-card>
                        </router-link> 
                    </div>
                </div>
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
            livros: [],            
            searchBook: '',
        }
    },
    computed: {
        getModuleImage(){
            return require('@/assets/images/btn-books.png')
        },
        ...mapState('Modules', ['activeModule'])
    },
    
    created(){
        this.fetchBooks().then((livros) => {            
            this.livros = livros              
        })   
    },
    methods: {
        registerUserProgress(module){
            return true
        },
        containSearch(bookTitle){
            if(bookTitle.toLowerCase().indexOf(this.searchBook.toLowerCase()) == -1){
                return false
            } 
            return true
        },
        ...mapActions('Books', ['fetchBooks']),
    },
}
</script>

<style lang="scss">
    #biblioteca{
        .book-search{
            @include card_boxshadow;
            border-radius: 1.25rem;
            border: 1.5px solid #ccc;
            margin: 15px auto;
            outline: none;
            padding: 10px;
            width: 100%;
            height: 50px;
        }
        .book-container{            
            max-width: 33%;  
            .book-sub-container{
                padding: 0 10px 0 10px;  
            }
        }
        .book-cover{
            max-width: 100px;
        }
        .book-title{
            display: inline;
            align-self: center;
            font-size: 1.2rem;
            text-align: center;
            color: transparentize($color: #000000, $amount: 0.5);
            padding: 10px;
        }

        .book-card{
            @include card_boxshadow;
            border-radius: 20px;
            transition: transform 0.3s ease-out;
            margin: 15px auto;
            &:hover{
                transform: scale(1.05);
            }

            .card-body{
                display: grid;
                grid-template-columns: 1fr 1fr;
                padding: 4px;
                height: $book-card-height;
            }

            .book-cover{
                position: relative;
                overflow: hidden;
            }

            .image.book-cover{
                max-width: 100%;
                height: ($book-card-height - 8px);
                position: relative;
                overflow: hidden;
                border-top-right-radius: 16px;
                border-bottom-right-radius: 16px;
                img, svg {
                    width: 100%;
                    min-height: ($book-card-height - 8px);
                }
            }
        }

        .book-animation-enter-active,
        .book-animation-leave-active {
            transition: all 0.8s;
        }
        .book-animation-enter,
        .book-animation-leave-to{
            opacity: 0;
        }
    }
</style>
