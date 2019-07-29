<template>
    <div>
        <a
            v-if="data.slug === 'ler' && !targetAudience"
            class="clean-links"
            @click="toggleVisibleLerSubModule"
        >
            <vue-circle
                class="m-5"
                :label="data.title"
                :image="getModuleImage"
                :progress="getProgressModule"
                :color="getModuleColor"
            />
        </a>
        <router-link
            v-else
            class="clean-links"
            :to="{
                name: getRouterName,
                params: { module_slug: data.slug, target_audience: targetAudience || 'geral' }
            }"
            replace
        >
            <vue-circle
                class="m-5"
                :label="label || data.title"
                :image="getModuleImage"
                :color="getModuleColor"
                :progress="getProgressModule"
            />
        </router-link>
    </div>
</template>

<script>
import { filter } from 'lodash'
import VueCircle from '@/components/ui/CircleProgress'
export default {
    components: { VueCircle },
    props: {
        label: String,
        image: String,
        color: Object,
        targetAudience: String,
        data: {
            type: Object,
            required: true
        },
        toggleVisibleLerSubModule: {
            type: Function,
            required: false
        },
    },
    computed: {
        getModuleImage(){
            if (this.image) return this.image

            switch (this.data.slug) {
            case 'comecar':
                return require('@/assets/images/btn-start.png')
            case 'ler':
                return require('@/assets/images/btn-read.png')
            case 'escrever':
                return require('@/assets/images/btn-write.png')
            case 'biblioteca':
                return require('@/assets/images/btn-books.png')
            default:
                return '';
            }
        },
        getModuleColor(){
            if (this.color) return this.color
            switch (this.data.slug) {
            case 'comecar':
                return  { color: '#EC2727' }
            case 'ler':
                return { color: '#00963F' }
            case 'escrever':
                return { color: '#007CB2' }
            case 'biblioteca':
                return  { color: '#F8A728' }
            default:
                return '';
            }
        },
        getProgressModule(target_audience){
            const themes = this.getProgressThemesByModuleId(this.data, target_audience)
            const total = ( filter(themes, { completed: true }).length / this.data.themes.length ) * 100
            return  total || 5
        },
        getRouterName() {
            switch (this.data.slug) {
            case 'escrever':
                return 'write';
            case 'biblioteca':
                return 'books';
            default:
                return 'module';
            }
        },
    },
    created(){
        console.log(this.targetAudience)
    },
    methods: {
        getProgressThemesByModuleId(module, target_audience){
            return this.$store.getters['Pointings/getThemesByModuleId'](module.id, target_audience)
        }
    }
}
</script>

<style>

</style>
