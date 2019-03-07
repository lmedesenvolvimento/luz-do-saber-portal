<template>
    <b-modal ref="modal" title="Falha" @hidden="onHidden">
        <p>Tente novamente!</p>
        <template slot="modal-ok">Ops :(</template>
        <template slot="modal-cancel">Fechar</template>
    </b-modal>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    data(){
        return {
            isVisible: false
        }
    },
    computed: {
        ...mapState({
            isVisibleActivityAlertFail: state => state.Alert.isVisibleActivityAlertFail
        })
    },
    methods: {
        onHidden(){
            this.hideAlertActivityFail()
            this.resetAnswer()
        },
        ...mapActions(['hideAlertActivityFail']),
        ...mapActions('Activity', ['resetAnswer'])
    },
    watch: {
        isVisibleActivityAlertFail(value){
            value ? this.$refs.modal.show() : this.$refs.modal.hide()
        }
    }
}
</script>

