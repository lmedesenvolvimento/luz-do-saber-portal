<template>
    <div>
        <a
            v-if="!isTargetAudience && hasMoreTargetAudience"
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

import { mapGetters } from 'vuex'
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
        fixedModules() {
            return ['escrever', 'karaoke', 'biblioteca']
        },
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
        getProgressModule(){
            if(this.data.themes) {
                const themes = this.getProgressThemesByModuleId(this.data)
                const percentage = themes.reduce((acc, { percentage }) => percentage ? acc + percentage : acc + 0, 0) / this.data.themes.length
                // const total = ( filter(themes, { completed: true }).length / this.data.themes.length ) * 100
                return  percentage > 5 ? percentage : 5
            } else return  5

        },
        getProgressLibrary(){
            const books = this.$store.getters['Books/getBooks']
            const total = ( filter(books, { completed: true }).length / books.length ) * 100
            return total || 5
        },
        getRouterName() {
            if(this.fixedModules.includes(this.data.slug)) return this.getEnglishName(this.data.slug)
<<<<<<< HEAD
            else if(!this.data.themes || this.hasMoreTargetAudience || this.hasMoreThemes)
=======
            else if(!this.data.themes || this.hasMoreTargetAudience)
>>>>>>> ec460b47 (Merged in fix/module-routes-history (pull request #290))
                return 'module'
            else return 'theme'
        },
        getRouterParams() {
            if(this.hasMoreTargetAudience)
                return { module_slug: this.data.module_slug, target_audience: this.data.slug }
<<<<<<< HEAD
            else if(this.isTargetAudience && this.data.themes) return { module_slug: this.data.module_slug, target_audience: this.data.slug, theme_slug: this.data.themes[0].slug }
            else if(this.hasMoreThemes && this.data.themes) return { module_slug: this.data.slug, target_audience: this.data.themes[0].target_audience }
            else if(this.data.themes) return { module_slug: this.data.slug, target_audience: this.data.themes[0].target_audience, theme_slug: this.data.themes[0].slug }
            else return false
=======
            else if(this.isTargetAudience) return { module_slug: this.data.module_slug, target_audience: this.data.slug, theme_slug: this.data.themes[0].slug }
            else return { module_slug: this.data.slug, target_audience: this.data.themes[0].target_audience, theme_slug: this.data.themes[0].slug }
>>>>>>> ec460b47 (Merged in fix/module-routes-history (pull request #290))
        },
        getComecarUnitRoute() {
            return '/game/comecar/' + this.data.themes[0].slug + '/' + this.data.themes[0].slug
        },
        getTargetAudience() {
            if(this.data.themes && this.data.themes.some((t) => t.theme_audience))
                return uniqBy(this.data.themes.map(({ theme_audience }) => ({ ...theme_audience })), 'id').filter(({ status }) => status !== 'inactive')
<<<<<<< HEAD
            else if (this.data.themes && this.data.themes.some((t) => t.theme_audience_id)) return this.data.themes
=======
            else if (this.data.themes.some((t) => t.theme_audience_id)) return this.data.themes
>>>>>>> ec460b47 (Merged in fix/module-routes-history (pull request #290))
            else return []
        },
        hasMoreThemes() {
            return !!this.data.themes ? this.data.themes.length > 1 : false
        },
        hasMoreTargetAudience() {
            return this.getTargetAudience.length > 1
        },
        isTargetAudience() {
<<<<<<< HEAD
            return !!this.data.themes ? this.data.themes.some((t) => t.theme_audience_id) : false
        },
        ...mapGetters('Pointings',['getThemesByModuleId'])
=======
            return this.data.themes.some((t) => t.theme_audience_id)
        }
>>>>>>> ec460b47 (Merged in fix/module-routes-history (pull request #290))
    },
    methods: {
        getProgressThemesByModuleId(m){
            return this.getThemesByModuleId(m.id, this.targetAudience)
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

<style>

</style>
