<template>
    <b-modal v-model="Alert.isVisibleActivityAlertSuccess" title="Sucesso" @hidden="resetAnswer">Parabéns tudo certo!</b-modal>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    computed: {
        ...mapState(['Alert'])
    },
    methods: {
        ...mapActions('Activity', ['resetAnswer'])
    }
}
</script>

