<template>
    <b-modal v-model="Alert.isVisibleActivityAlertFail" title="Falha" @hidden="resetAnswer">Tente novamente!</b-modal>
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

