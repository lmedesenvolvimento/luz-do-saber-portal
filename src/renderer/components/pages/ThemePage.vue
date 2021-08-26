<template>
    <div v-if="theme" id="theme" class="page-container">
        <navbar
            :navbar-title="renderNavTitle"
            :navbar-subtitle="'Unidades'"
            :navbar-icon="themeImage"
            :custom="getThemeName"
        />
        <div class="page-container-wrap-spacing">
            <b-row v-if="theme">
                <b-col v-for="unit in getUnits" :key="unit.id" cols="6">
                    <div class="theme-unit-box">
                        <router-link
                            :to="{
                                name: 'unit',
                                params: {
                                    module_slug: $route.params.module_slug,
                                    theme_slug: theme.slug,
                                    unit_slug: unit.slug
                                }
                            }"
                        >
                            <themes-box :unit="unit" :theme-color="getThemeColor(theme)" :theme="theme" />
                        </router-link>
                    </div>
                </b-col>
            </b-row>
        </div>
        <ls-alert-activity-success></ls-alert-activity-success>
    </div>
</template>

<script>
import { omit, filter } from 'lodash'
import { mapState, mapActions, mapGetters } from 'vuex'
import { RouteMixin } from './index'

import alerts from '@/components/alerts'
import ThemesBox from '../ui/ThemesBox'
import Navbar from '../ui/navbars/Navbar'

export default {
    components: {
        ThemesBox,
        Navbar,
        ...alerts
    },
    mixins: [RouteMixin],
    data() {
        return {
            emptyCellUnit: false
        }
    },
    computed: {
        getThemeName() {
            let correctThemeName
            if (this.$route.params.module_slug === 'comecar') {
                correctThemeName = true
            } else {
                correctThemeName = false
            }

            return correctThemeName
        },
        getUnits() {
            if (!this.theme.units)
                return []
            return this.theme.units.filter((u) => u.status === 'active')
        },
        renderNavTitle(){
            return this.theme.title ? 'Tema ' + this.theme.title : ''
        },
        baseUrl(){
            return process.env.BASE_API_URL || 'https://luz-do-saber-staging.herokuapp.com'
        },
        themeImage(){
            return this.theme.cover_url ? this.theme.cover_url : ''
        },
        fixedModules() {
            return ['escrever', 'karaoke', 'livros']
        },
        ...mapState('Theme', ['theme']),
        ...mapState('Pointings', ['units']),
        ...mapGetters('Pointings',['getPointingsActivitiesByUnitId', 'getUnitsByThemeId'])

    },
    created(){
        this.fetchTheme(this.$route.params).then(this.registerUserProgress)
    },
    beforeDestroy(){
        this.destroyTheme()
    },
    methods: {
        getThemeColor(theme){
            switch (theme.modulo_id) {
            case 1:
                return '#C72929'
            case 2:
                return '#00963F'
            case 3:
                return '#007CB2'
            default:
                break
            }
        },
        calculatePercentage(sample, total) {
            const percent = sample / total
            return Math.floor(percent * 100)
        },
        registerUserProgress(theme){
            theme.units.forEach((unit) => {
                const activities = this.getActivitiesProgressByUnitId(unit)
                const completed = unit.questions.length > 0 ? activities.length === unit.questions.length : false
                const percentage = unit.questions.length > 0 ? this.calculatePercentage(activities.length, unit.questions.length) : 100
                const payload = {
                    data: {
                        ...omit(unit, ['questions']),
                        questions: unit.questions.map(({ id, order }) => ({ id, order })),
                        completed,
                        percentage
                    },
                    type: 'units',
                }
                this.add(payload)
            })
            this.registerReadProgress()
        },
        registerReadProgress(){
            // const { module_slug } = this.$route.params

            this.fetchModule(this.$route.params).then(_module => {
                _module.themes.forEach((theme) => {
                    // fixed modules não tem atividades, logo, não tem progresso
                    if(this.fixedModules.includes(theme.slug)) {
                        return false
                    }
                    const units = this.getProgressUnitsByThemeId(theme)
                    const unitsWithActivities = units.filter(({ questions }) => questions.length > 0)
                    const completed = unitsWithActivities.findIndex(({ completed }) => !completed) < 0
                    const totalPercentage = units.reduce((acc, { percentage }) => acc + percentage, 0) / units.length
                    const payload = {
                        data: {
                            ...omit(theme, ['units']),
                            completed,
                            percentage : Math.floor(totalPercentage)
                        },
                        type: 'themes',
                    }
                    this.add(payload)
                })
            })
        },
        getActivitiesProgressByUnitId(unit){
            return this.getPointingsActivitiesByUnitId(unit.id)
        },
        getProgressUnitsByThemeId(theme){
            return this.getUnitsByThemeId(theme.id)
        },
        ...mapActions('Theme', ['fetchTheme','destroyTheme']),
        ...mapActions('Modules', ['fetchModule']),
        ...mapActions('Pointings', ['add'])
    }
}
</script>

<style>
</style>
