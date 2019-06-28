<template>
    <nav class="navbar navbar-default">
        <b-btn variant="link" :to="custom ? historyBackUnit : historyBack">
            <div v-if="this.$route.name !== 'module'" class="icon-lista"></div>
        </b-btn>

        <b-btn variant="link" to="/">
            <div class="icon-home"></div>
        </b-btn>

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
    }
};
</script>

<style lang="scss">
.navbar {
    .btn-link{
        padding: 0.375rem 0.35rem;
    }
}
</style>
