<template>
    <div id="theme" class="page-container">
        <ls-navbar
            :navbar-title="'TEMA '+theme.title"
            :navbar-subtitle="'Unidades'"
            :navbar-icon="'https://placeimg.com/480/480/tech'"
        />
        <div class="container">
            <b-col v-if="theme" class="my-5 theme-unities-list">
                <b-col v-for="unit in theme.units" :key="unit.id" class="mx-4 my-4 theme-unit">
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
                        <b-row class="mx-4 p-3 header-unit">
                            <h2 class="unit-title">{{ unit.title }}</h2>
                        </b-row>
                        <b-row class="unit-body">
                            <b-col class="unit-info px-5">
                                <b-row><h3>ATIVIDADES:</h3></b-row>
                                <b-row class="my-2 activities-completed">0/5</b-row>
                                <b-row class="line" />
                                <b-row class="my-3 stars">
                                    <b-col class="star" />
                                    <b-col class="star" />
                                    <b-col class="star" />
                                </b-row>
                            </b-col>
                            <b-col class="unit-image" />
                        </b-row>
                    </router-link>
                </b-col>
            </b-col>
            <b-btn variant="link" :to="historyBack" class="m-2">Voltar</b-btn>
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
