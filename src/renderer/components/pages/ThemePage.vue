<template>
    <div id="theme" class="page-container">
        <navbar
            :navbar-title="'TEMA '+theme.title"
            :navbar-subtitle="'Unidades'"
            :navbar-icon="'https://placeimg.com/480/480/tech'"
        />
        <div class="container">
            <div class="py-5">
                <b-col v-if="theme" class="my-5 theme-unities-list">
                    <b-col v-for="unit in theme.units" :key="unit.id" class="mx-5 my-4 theme-unit">
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
                            <themes-box :unit="unit" :theme-slug="theme.slug" />
                        </router-link>
                    </b-col>
                </b-col>
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
    computed: {
        ...mapState('Theme', ['theme'])
    },
    created(){
        this.fetchTheme(this.$route.params)
    },
    methods: {
        ...mapActions('Theme', ['fetchTheme'])
    }
};
</script>

<style>
</style>
