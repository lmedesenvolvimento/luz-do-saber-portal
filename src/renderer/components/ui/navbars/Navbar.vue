<template>
    <nav class="navbar navbar-default">
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
export default {
    props: {
        navbarIcon: String,
        navbarTitle: String,
        navbarSubtitle: String
    }
};
</script>
