<template>
    <div id="app" :class="$context">
        <b-container class="fill" :class="$route.params.module_slug">
            <transition name="page" mode="out-in">
                <router-view></router-view>
            </transition>
        </b-container>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    created() {
        this.recoveryUserDatabase()
        this.recoveryPointingsDatabase()
    },
    methods: {
        ...mapActions('User',['recoveryUserDatabase']),
        ...mapActions('Pointings',['recoveryPointingsDatabase'])
    }
}
</script>

<style lang="scss">
@import '~@/assets/styles/main.scss'
</style>
