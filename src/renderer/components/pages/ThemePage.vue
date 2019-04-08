<template>
    <div id="theme" class="page-container">
        <ls-navbar
            :navbar-title="'TEMA '+theme.title"
            :navbar-subtitle="'Unidades'"
            :navbar-icon="'https://placeimg.com/480/480/tech'"
        />

        <div class="container">            
            <b-row v-if="theme" class="m-5 theme-unities-list">
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
                        <b-row class="mx-5 p-3 header-unit">
                            <div class="unit-title">{{ unit.title }}</div>
                        </b-row>
                        <b-row class="unit-body">
                            <b-col class="mw-50 unit-info">
                                <b-row>ATIVIDADES:</b-row>
                                <b-row class="px-5 py-2 activities-completed">0/5</b-row>
                                <b-row class="mx-5 line" />
                                <b-row class="px-5 py-3 stars">
                                    <b-col>
                                        <div class="star" />
                                    </b-col>
                                    <b-col>
                                        <div class="star" />
                                    </b-col>
                                    <b-col>
                                        <div class="star" />
                                    </b-col>
                                </b-row>
                            </b-col>
                            <b-col class="mw-50 unit-image" />
                        </b-row>
                    </router-link>
                </b-col>     
            </b-row>
            <b-btn variant="link" :to="historyBack">Voltar</b-btn>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { RouteMixin } from './index';

import ui from '@/components/ui';

export default {
    components: { ...ui },
    mixins: [RouteMixin],
    created() {
        this.fetchTheme(this.$route.params);
    },
    computed: {
        ...mapState('Theme', ['theme'])
    },
    methods: {
        ...mapActions('Theme', ['fetchTheme'])
    }
};
</script>

<style>
</style>
