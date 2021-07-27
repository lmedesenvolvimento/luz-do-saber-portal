<template>
    <div>
        <a
            v-if="hasMoreTargetAudience"
            class="clean-links"
            @click="() => toggleVisibleSubModule(data.slug)"
        >
            <vue-circle
                :label="data.title"
                :image="getModuleImage"
                :slug="slug"
                :progress="getProgress"
                :color="getModuleColor"                
            />
        </a>
        <router-link
            v-else
            class="clean-links"
            :to="{
                name: getRouterName,
                params: getRouterParams
            }"
            replace
        >   
            <vue-circle
                :label="label || data.title"
                :image="getModuleImage"
                :slug="slug"
                :color="getModuleColor"
                :progress="getProgress"
            />
        </router-link>
    </div>
</template>

<script>
import { filter, uniqBy } from 'lodash'
import VueCircle from '@/components/ui/CircleProgress'
export default {
    components: { VueCircle },
    props: {
        label: String,
        image: String,
        color: Object,
        data: {
            type: Object,
            required: true
        },
        slug: {
            type: String,
            default: 'ler'
        },
        toggleVisibleSubModule: {
            type: Function,
            required: false
        }
    },
    computed: {
        getModuleImage(){
            console.log(this.image)
            console.log(this.data.slug)
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
            case 'karaoke':
                return require('@/assets/images/btn-karaoke.png')
            default:
                return undefined
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
            case 'karaoke':
                return  { color: '#910281' }
            default:
                return ''
            }
        },
        getProgress(){
            switch (this.data.type) {
            case 'library':
                return this.getProgressLibrary
            default:
                return this.getProgressModule
            }
        },
        getProgressModule(target_audience){
            if(this.data.themes) {
                const themes = this.getProgressThemesByModuleId(this.data)
                const total = ( filter(themes, { completed: true }).length / this.data.themes.length ) * 100
                return  total || 5
            } else return  5

        },
        getProgressLibrary(){
            const books = this.$store.getters['Books/getBooks']
            const total = ( filter(books, { completed: true }).length / books.length ) * 100
            return total || 5
        },
        getRouterName() {
            switch (this.data.slug) {
            case 'escrever':
                return 'write'
            case 'biblioteca':
                return 'books'
            case 'karaoke':
                return 'karaoke'
            default:
                return 'module'
            }
        },
        getRouterParams() {
            if(this.data.themes)
                return { module_slug: this.data.slug, target_audience: this.data.themes[0].target_audience || 'geral' }
            else return { module_slug: this.data.module_slug, target_audience: this.data.slug}
        },
        getComecarUnitRoute() {
            return '/game/comecar/' + this.data.themes[0].slug + '/' + this.data.themes[0].slug
        },
        getTargetAudience() {
            if(this.data.themes)
                return uniqBy(this.data.themes.map(({ theme_audience }) => ({ ...theme_audience })), 'id').filter(({ status }) => status !== 'inactive')
            else return []
        },
        hasMoreTargetAudience() {
            return this.getTargetAudience.length > 1
        }
    },
    methods: {
        getProgressThemesByModuleId(m){
            return this.$store.getters['Pointings/getThemesByModuleId'](m.id, this.targetAudience)
        },
    }
}
</script>

<style>

</style>
