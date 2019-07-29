<template>
    <div
        id="escrever"
        class="page-container biblioteca"
    >
        <navbar
            :navbar-title="book.title"
            :navbar-subtitle="''"
        />
        <div class="container-fluid">
            <p>{{ book.title }}</p>
        </div>
    </div>
</template>

<script>
import Navbar from '../ui/navbars/Navbar'
export default {
    components: { Navbar },
    computed: {
        getModuleImage(){
            return require('@/assets/images/btn-write.png')
        },
        book(){
            const id = parseInt(this.$route.params.livro_id)
            const book = this.$store.getters['Books/getBookById'](id)
            return book || {}
        }
    }
}
</script>

<style>

</style>
