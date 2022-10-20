<template>
    <div id="app" :class="[$context, { 'is-mobile': $mq === 'xs' }]">
        <b-container class="fill" :class="moduleTheme">
            <transition name="page" mode="out-in">
                <router-view></router-view>
            </transition>
        </b-container>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    computed: {
        moduleTheme() {
            const isNamed = ['comecar', 'ler', 'escrever', 'biblioteca', 'karaoke'].includes(this.$route.params.module_slug)
            return isNamed ? this.$route.params.module_slug : 'default'
        }
    },
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
