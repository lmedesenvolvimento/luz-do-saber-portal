<template>
    <b-modal ref="exit-modal" centered hide-footer content-class="confirm-exit">
        <template slot="modal-header">
            <div class="confirm-exit-header">
                <div class="confirm-exit-header-item">
                    <h2 class="confirm-exit-header-item-text"><b>sair</b></h2>
                </div> 
            </div>
        </template>
        <b-img class="confirm-exit-image" center :src="require('@/assets/images/components/feedback/expression-star-0.png')" />  
        <div class="confirm-exit-text">
            <h5><b>OPS!</b></h5>
            <h5>Você realmente <span class="confirm-exit-text-golden">deseja sair?</span></h5>   
        </div>
        <div class="confirm-exit-footer">
            <div><b-img class="confirm-exit-button" :src="require('@/assets/images/btn-close.png')" @click="hideModal" /></div>
            <div><b-img class="confirm-exit-button" :src="require('@/assets/images/icons/escrever/icon-next.png')" width="61" height="61" @click="exitModal" /></div>
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