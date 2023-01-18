<template>
    <div>
        <vue-circle
            v-if="!isTargetAudience && hasMoreTargetAudience"
            class="clean-links"
            :label="title"
            :image="getModuleImage"
            :slug="slug"
            :progress="getProgress"
            :color="getModuleColor"
            @click="$emit('toggle-visible-sub-module', slug)"
        />
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
                :label="title"
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

import { mapGetters } from 'vuex'
export default {
    components: { VueCircle },
    props: {
        title: {
            type: String,
            default: ''
        },
        image: {
            type: String,
            default: ''
        },
        color: {
            type: String,
            default: ''
        },
        slug: {
            type: String,
            default: 'ler'
        },
        themes: {
            type: Array,
            default: () => []
        },
        id: {
            type: [Number, String],
            default: 0
        }, 
        moduleSlug: {
            type: String,
            default: ''
        },
        coverFullUrl: {
            type: String,
            default: ''
        },
    },
    computed: {
        fixedModules() {
            return ['escrever', 'karaoke', 'biblioteca']
        },
        getModuleImage(){
            if (this.image) return this.image
            else if (this.coverFullUrl) return this.coverFullUrl

            switch (this.slug) {
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
                return require('@/assets/images/components/journal/photo-holder.png')
            }
        },
        getModuleColor(){
            if (this.color) return this.color
            else if (this.moduleSlug === 'ler') return '#00963F'
            const colors = {
                comecar:'#EC2727',
                ler: '#00963F',
                escrever: '#007CB2',
                biblioteca:  '#F8A728',
                karaoke: '#910281'
            }
            return colors[this.slug] || '#0fa7a1'
        },
        getProgress(){
            switch (this.type) {
            case 'library':
                return this.getProgressLibrary
            default:
                return this.getProgressModule
            }
        },
        getProgressModule(){
            if(this.themes) {
                const themes = this.getProgressThemesByModuleId(this.id)
                const percentage = themes.reduce((acc, { percentage }) => percentage ? acc + percentage : acc + 0, 0) / this.themes.length
                return percentage > 5 ? percentage : 5
            } else return  5

        },
        getProgressLibrary(){
            const books = this.$store.getters['Books/getBooks']
            const total = ( filter(books, { completed: true }).length / books.length ) * 100
            return total || 5
        },
        getRouterName() {
            if(this.fixedModules.includes(this.slug)) return this.getEnglishName(this.slug)
            else if(!this.themes || this.hasMoreTargetAudience || this.hasMoreThemes)
                return 'module'
            else return 'theme'
        },
        getRouterParams() {
            if(this.hasMoreTargetAudience)
                return { module_slug: this.moduleSlug, target_audience: this.slug }
            else if(this.isTargetAudience && this.themes) return { module_slug: this.moduleSlug, target_audience: this.slug, theme_slug: this.themes[0].slug }
            else if(this.hasMoreThemes && this.themes) return { module_slug: this.slug, target_audience: this.themes[0].target_audience }
            else if(this.themes) return { module_slug: this.slug, target_audience: this.themes[0].target_audience, theme_slug: this.themes[0].slug }
            else return false
        },
        getComecarUnitRoute() {
            return '/game/comecar/' + this.themes[0].slug + '/' + this.themes[0].slug
        },
        getTargetAudience() {
            if(this.themes && this.themes.some((t) => t.theme_audience))
                return uniqBy(this.themes.map(({ theme_audience }) => ({ ...theme_audience })), 'id').filter(({ status }) => status !== 'inactive')
            else if (this.themes && this.themes.some((t) => t.theme_audience_id)) return this.themes
            else return []
        },
        hasMoreThemes() {
            return !!this.themes ? this.themes.length > 1 : false
        },
        hasMoreTargetAudience() {
            return this.getTargetAudience.length > 1
        },
        isTargetAudience() {
            return !!this.themes ? this.themes.some((t) => t.theme_audience_id) : false
        },
        ...mapGetters('Pointings',['getThemesByModuleId'])
    },
    methods: {
        getProgressThemesByModuleId(id){
            return this.getThemesByModuleId(id, this.targetAudience)
        },
        getEnglishName(name) {
            switch (name) {
            case 'escrever':
                return 'write'
            case 'biblioteca':
                return 'books'
            case 'karaoke':
                return 'karaoke'
            default:
                return 'module'
            }
        }
    }
}
</script>
