<template>
    <div id="app">
        <b-container class="fill">
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

<style>
</style>
