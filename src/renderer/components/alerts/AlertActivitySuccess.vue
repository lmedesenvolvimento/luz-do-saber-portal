<template>
    <b-modal ref="modal" title="Sucesso" @hidden="onHidden">
        <p>Parabéns tudo certo!</p>
        <template slot="modal-ok">Urru!</template>
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
            isVisibleActivityAlertSuccess: state => state.Alert.isVisibleActivityAlertSuccess
        })
    },
    methods: {
        onHidden(){
            this.hideAlertActivitySuccess()
            this.resetAnswer()
        },
        ...mapActions(['hideAlertActivitySuccess']),
        ...mapActions('Activity', ['resetAnswer'])
    },
    watch: {
        isVisibleActivityAlertSuccess(value){
            value ? this.$refs.modal.show() : this.$refs.modal.hide()
        }
    }
}
</script>
