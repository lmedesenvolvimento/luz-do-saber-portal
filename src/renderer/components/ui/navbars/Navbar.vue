<template>
    <nav class="navbar navbar-default">
        {{ setHistory() }}
        <b-btn variant="link" :to="customRouteLink">
            <div class="icon-prev"></div>
        </b-btn>

        <router-link to="/">
            <div class="icon-home"></div>
        </router-link>

        <span class="flex"></span>

        <div class="title-holder">
            <img 
                v-if="navbarIcon"
                :src="navbarIcon" 
                class="icon"
            >
            
            <div v-if="navbarIcon" class="vertical-bar"></div>

            <div class="titles">
                <div v-if="navbarTitle" class="navbar-title">{{ navbarTitle }}</div>
                <div v-if="navbarSubtitle" class="subtitle">{{ navbarSubtitle }}</div>
            </div>
        </div>

        <span class="flex"></span>
    </nav>
</template>
<script>
import { RouteMixin } from '../../pages/index'

export default {
    mixins: [RouteMixin],
    props: {
        navbarIcon: String,
        navbarTitle: String,
        navbarSubtitle: String,
        custom: Boolean,
    },
    data: function() {
        return {
            customRouteLink: ''
        }
    },
    methods: {
        setHistory: function () {
            console.log(this.custom);

            if (this.custom) {
                this.customRouteLink = this.historyBackUnit;
            } else {
                this.customRouteLink = this.historyBack;
            }
        }
    }
};
</script>
