<template>
    <div>
        <b-modal :centered="true" content-class="feedback" :header-class="moduleSlug" :hide-footer="true" v-model="isVisible">
            <template slot="modal-header" >
                <div class="feedback-header">
                     <div class="feedback-stars feedback-header-item">
                         
                        <!-- <img :src="imgStarEmpty" class="feedback-small-stars" alt="star-empty"> 
                        <img :src="imgStarEmpty" class="feedback-small-stars" alt="star-empty"> 
                        <img :src="imgStarEmpty" class="feedback-small-stars" alt="star-empty">  -->
                        <img v-if="stars<1" :src="imgStarEmpty" class="feedback-small-stars" alt="star-empty"> 
                        <img v-else :src="imgStarFull" class="feedback-small-stars" alt="star-full">
                        <img v-if="stars<2" :src="imgStarEmpty" alt="star-empty"> 
                        <img v-else :src="imgStarFull" alt="star-full">
                        <img v-if="stars<3" :src="imgStarEmpty" class="feedback-small-stars" alt="star-empty"> 
                        <img v-else :src="imgStarFull" class="feedback-small-stars" alt="star-full">
                    </div>
                    <div class="feedback-header-item "><h5 class="feedback-rounded-number">1</h5></div>
                    <div class="feedback-header-item"><h5>{{activityName}}</h5></div>
                </div>                
            </template>
            <br>
            <div v-if="stars==0" class="feedback-content">
                <img :src="require('@/assets/images/components/feedback/expression-star-0.png')" alt="expression-star-0">                 
                <br>
                <h5>QUE PENA!</h5>
                <div class="feedback-itim"><h5>VOCÊ NÃO CONSEGUIU <span class="feedback-golden">NENHUMA ESTRELA</span>.</h5></div>
                <div class="feedback-itim"><h5>TENTE NOVAMENTE!</h5></div>
            </div> 
            <div v-else-if="stars==1" class="feedback-content">
                <img :src="require('@/assets/images/components/feedback/expression-star-1.png')" alt="expression-star-1">                 
                <br>
                <h5>QUASE!</h5>
                <div class="feedback-itim"><h5>VOCÊ CONSEGUIU <span class="feedback-golden">UMA ESTRELA</span>.</h5></div>
                <div class="feedback-itim"><h5>VAMOS TENTAR NOVAMENTE?</h5></div>
            </div>
            <div v-else-if="stars==2" class="feedback-content">
                <img :src="require('@/assets/images/components/feedback/expression-star-2.png')" alt="expression-star-2">                 
                <br>
                <h5>MUITO BEM!</h5>
                <div class="feedback-itim"><h5>VOCE CONSEGUIU <span class="feedback-golden">DUAS ESTRELAS</span>.</h5></div>
                <div class="feedback-itim"><h5>DESEJA TENTAR NOVAMENTE?</h5></div>
            </div>
            <div v-else-if="stars==3" class="feedback-content">
                <img :src="require('@/assets/images/components/feedback/expression-star-3.png')" alt="expression-star-3">                
                <br>
                <h5>PARABÉNS!</h5>
                <div class="feedback-itim"><h5>VOCÊ COMPLETOU A ATIVIDADE</h5></div>
                <div class="feedback-itim"><h5>COM <span class="feedback-golden">EXCELÊNCIA</span>!</h5></div>
            </div>   
            <br>
            <div class="feedback-footer-buttons">
                <img :src="require('@/assets/images/components/feedback/comecar/redo-button.png')" alt="redo-button"> 
                <img :src="require('@/assets/images/components/feedback/comecar/next-button.png')" alt="next-button"> 
            </div>  
        </b-modal>    
    </div> 
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    data(){
        return {
            stars: 2,
            isVisible: false,
            imgStarEmpty: require('@/assets/images/components/feedback/star-empty.png'),
            imgStarFull: require('@/assets/images/components/feedback/star-full.png'),
            activityName: "",
            moduleSlug: "",
         }
    },
    computed: {
        ...mapState({
            isVisibleActivityAlertSuccess: state => state.Alert.isVisibleActivityAlertSuccess
        }),
        ...mapState('Activity',['activity']),
    },
    methods: {
        onHidden(){
            this.hideAlertActivitySuccess()
        },
        ...mapActions(['hideAlertActivitySuccess']),
    },
    watch: {
        isVisibleActivityAlertSuccess(value){
            // console.log(value)
            this.isVisible = value
        },
        activity(value){
            // console.log("damis yeye", value)
            this.activityName = value.title.text
            this.moduleSlug = value.module.slug
        },
        moduleSlug(value) {
            console.log("module slug", value)
        }
    }
}
</script>
