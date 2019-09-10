<template>
    <div v-if="theme" id="theme" class="page-container">
        <navbar
            :navbar-title="renderNavTitle"
            :navbar-subtitle="'Unidades'"
            :navbar-icon="themeImage"
            :custom="getThemeName()"
        />
        <!-- <navbar
            v-else
            :navbar-title="renderNavTitle"
            :navbar-subtitle="'Unidades'"
            :navbar-icon="themeImage"
        /> -->
        <div class="page-container-wrap-spacing">
            <b-row v-if="theme">
                <b-col v-for="unit in theme.units" :key="unit.id" cols="12" md="6">
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
                            <themes-box :unit="unit" :theme-color="getThemeColor(theme)" />
                        </router-link>
                    </div>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
import { omit, filter } from 'lodash'
import { mapState, mapActions, mapGetters } from 'vuex';
import { RouteMixin } from './index';

import ThemesBox from '../ui/ThemesBox'
import Navbar from '../ui/navbars/Navbar';

export default {
    components: {
        ThemesBox,
        Navbar,
    },
    mixins: [RouteMixin],
    data() {
        return {
            emptyCellUnit: false
        }
    },
    computed: {
        renderNavTitle(){
            return this.theme.title ? 'Tema ' + this.theme.title : ''
        },
        baseUrl(){
            return process.env.BASE_API_URL || 'https://luz-do-saber-staging.herokuapp.com'
        },
        themeImage(){
            return this.theme.cover_url ? this.theme.cover_url : ''
        },
        ...mapState('Theme', ['theme']),
        ...mapState('Pointings', ['units']),

    },
    created(){
        this.fetchTheme(this.$route.params).then(this.registerUserProgress)
    },
    beforeDestroy(){
        this.destroyTheme()
    },
    methods: {
        getThemeName() {
            let correctThemeName;
            if (this.$route.params.module_slug === 'comecar') {
                correctThemeName = true;
            } else {
                correctThemeName = false;
            }

            return correctThemeName;
        },
        getThemeColor(theme){
            switch (theme.modulo_id) {
            case 1:
                return '#C72929'
            case 2:
                return '#00963F'
            case 3:
                return '#007CB2'
            default:
                break;
            }
        },
        registerUserProgress(theme){
            theme.units.forEach((unit) => {
                const activities = this.getActivitiesProgressByUnitId(unit)
                const completed = activities.length === unit.questions.length
                const payload = {
                    data: {
                        ...omit(unit, ['questions']),
                        completed
                    },
                    type: 'units',
                }
                this.add(payload)
            })
        },
        getActivitiesProgressByUnitId(unit){
            return this.$store.getters['Pointings/getPointingsActivitiesByUnitId'](unit.id)
        },
        ...mapActions('Theme', ['fetchTheme','destroyTheme']),
        ...mapActions('Pointings', ['add'])
    }
};
</script>

<style>
</style>
