<template>
    <b-modal ref="exit-modal" hide-footer content-class="confirm-exit">
        <template slot="modal-header">
            <b-col>
                <b-row class="confirm-exit-header" align-h="center">
                    <h2>sair</h2>
                </b-row> 
            </b-col>
        </template>
        <b-img center :src="require('@/assets/images/components/feedback/expression-star-0.png')" />  
        <div class="confirm-exit-text">
            <h5><b>OPS!</b></h5>
            <h5>Você realmente deseja sair?</h5>   
        </div>
        <div class="confirm-exit-buttons">
            <b-img center :src="require('@/assets/images/btn-close.png')" width="61" height="61" @click="hideModal" />
            <b-img center :src="require('@/assets/images/icons/escrever/icon-next.png')" width="61" height="61" @click="exitModal" />
        </div>
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