<template>
    <div id="theme" class="page-container">
        <navbar
            v-if="theme"
            :navbar-title="renderNavTitle"
            :navbar-subtitle="'Unidades'"
            :navbar-icon="themeImage"
        />
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
import { mapState, mapActions } from 'vuex';
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
            return process.env.BASE_API_URL ? process.env.BASE_API_URL : 'https://luz-do-saber-staging.herokuapp.com'

        },
        themeImage(){
            return this.theme.cover_url ? this.baseUrl + this.theme.cover_url : ''
        },
        ...mapState('Theme', ['theme']),
        
    },
    created(){
        this.fetchTheme(this.$route.params)        
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
                break;
            }
        },
        ...mapActions('Theme', ['fetchTheme','destroyTheme'])
    }
};
</script>

<style>
</style>
