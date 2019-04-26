<template>
    <div id="theme" class="page-container">
        <navbar
            :navbar-title="'TEMA '+theme.title"
            :navbar-subtitle="'Unidades'"
            :navbar-icon="'https://placeimg.com/480/480/tech'"
        />
        <div class="mt-5 container">
            <div class="mt-5 centralize">
                <div class="mt-5">
                    <b-list-group v-if="theme" horizontal class="mt-5 theme-unities-list">
                        <b-list-group-item v-for="unit in theme.units" :key="unit.id" class="mx-5 my-4 theme-unit">
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
                        </b-list-group-item>
                        <b-list-group-item v-show="emptyCellUnit" class="mx-5 my-4 theme-unit" />
                    </b-list-group>
                </div>
            </div>
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
            var numUnities = list.getElementsByClassName('theme-unit').length

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
