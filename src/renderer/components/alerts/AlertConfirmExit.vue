<template>
    <b-modal ref="exit-modal" hide-footer title="Using Component Methods">
        <b-button @click="hideModal">cancelar</b-button>
        <b-button @click="exitModal">sair</b-button>
    </b-modal>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    props: {
        showExitModal: Boolean
    },
    watch: {
        showExitModal(){
            this.showModal();
        }
    },
    methods: {       
        showModal(){
            this.$refs['exit-modal'].show();
        },
        hideModal() {
            this.$refs['exit-modal'].hide();
        },
        exitModal(){
            this.hideModal();
            this.destroyUserDatabase();
        },
        ...mapActions('User',['createUserDatabase', 'destroyUserDatabase']),
    }
}
</script>