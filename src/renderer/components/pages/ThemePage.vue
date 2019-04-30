<template>
    <div id="theme" class="d-flex align-items-center page-container">
        <navbar
            :navbar-title="renderNavTitle"
            :navbar-subtitle="'Unidades'"
            :navbar-icon="'https://placeimg.com/480/480/tech'"
        />
        <div class="container">
            <b-col v-if="theme" class="theme-unities-list">
                <b-col v-for="unit in theme.units" :key="unit.id" class="mx-5 my-4 flex-fill theme-unit-box">
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
                </b-col>
            </b-col>
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
        ...mapState('Theme', ['theme']),
        
    },
    created(){
        this.fetchTheme(this.$route.params)
    },
    updated() {
        this.emptyCellUnit = this.alignEmptySpaces()
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
        alignEmptySpaces() {
            var list = document.getElementsByClassName('theme-unities-list')[0]
            var numUnities = list.getElementsByClassName('theme-unit-box').length

            if (numUnities % 2 == 0){
                return true
            }
        },
        ...mapActions('Theme', ['fetchTheme'])
    }
};
</script>

<style>
</style>
