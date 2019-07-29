<template>
    <div
        id="escrever"
        class="page-container biblioteca"
    >
        <navbar
            navbar-title="uwu"
            :navbar-subtitle="''"
            :navbar-icon="getModuleImage"
        />
        <p>{{ $route ? $route.params.livro.title : 'não achei' }}</p>
    </div>
</template>

<script>
import Navbar from '../ui/navbars/Navbar'
export default {
    components: { Navbar },
    props: {
        livro: {
            require: true,
            type: Object,
        },
    },
    computed: {
        getModuleImage(){
            return require('@/assets/images/btn-write.png')
        }
    },
    created(){
        console.log(this.$route ? this.$route.params.livro.title : 'não achei')
    },
}
</script>

<style>

</style>
