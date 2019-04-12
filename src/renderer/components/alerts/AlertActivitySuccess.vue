<template>
    <div>
        <b-modal :visible="isVisible" :centered="true" content-class="feedback" :header-class="moduleSlug" :hide-footer="true" @hide="onHidden">
            <template slot="modal-header">
                <div class="feedback-header">
                    <div class="feedback-stars feedback-header-item">                         
                        <img :src="star(0)" class="feedback-small-stars" alt="star"> 
                        <img :src="star(1)" alt="star"> 
                        <img :src="star(2)" class="feedback-small-stars" alt="star">                        
                    </div>
                    <div class="feedback-header-item "><h5 class="feedback-rounded-number">1</h5></div>
                    <div class="feedback-header-item"><h5>{{ activityName }}</h5></div>
                </div>                
            </template>
            <br>
            <div class="feedback-content">
                <img :src="expressionStar" alt="expression-star">                 
                <br>
                <h5>{{ feedbackText1 }}</h5>
                <div v-if="stars==3" class="feedback-itim"><h5>{{ feedbackText5 }}</h5></div>
                <div class="feedback-itim"><h5>{{ feedbackText2 }} <span class="feedback-golden">{{ feedbackText3 }}</span>{{ feedbackText4 }}</h5></div>
                <div v-if="stars!=3" class="feedback-itim"><h5>{{ feedbackText5 }}</h5></div>
            </div>             
            <br>
            <div class="feedback-footer-buttons">
                <div class="icon-redo"></div> 
                <div class="icon-next"></div>              
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
            activityName: '',
            moduleSlug: ''
        }
    },
    computed: {
        feedbackText1: function () {
            switch(this.stars){
            case 0: 
                return 'Que Pena!'
            case 1:
                return 'Quase!'
            case 2: 
                return 'Muito Bem!'
            case 3:
                return 'Parabéns!'
            default:
                return ''
            }
        },
        feedbackText2: function () {
            switch(this.stars){
            case 0: 
                return 'Você não conseguiu'
            case 1:
                return 'Você conseguiu'
            case 2: 
                return 'Você conseguiu'
            case 3:
                return 'com'
            default:
                return ''
            }
        },
        feedbackText3: function () {
            switch(this.stars){
            case 0: 
                return 'Nenhuma Estrela'
            case 1:
                return 'Uma Estrela'
            case 2: 
                return 'Duas Estrelas'
            case 3:
                return 'Excelência'
            default:
                return ''
            }
        },
        feedbackText4: function () {
            if(this.stars == 3){
                return '!';
            }
            return '.'
        },
        feedbackText5: function () {
            switch(this.stars){
            case 0: 
                return 'Tente novamente!'
            case 1:
                return 'Vamos tentar novamente?'
            case 2: 
                return 'Deseja tentar novamente?'
            case 3:
                return 'Você completou a atividade';
            default:
                return ''
            }
        },
        expressionStar: function () {
            switch(this.stars) {
            case 0:
                return require('@/assets/images/components/feedback/expression-star-0.png')
            case 1:
                return require('@/assets/images/components/feedback/expression-star-1.png')
            case 2:
                return require('@/assets/images/components/feedback/expression-star-2.png')
            case 3:
                return require('@/assets/images/components/feedback/expression-star-3.png')
            default:
                return ''
            }
        },
        ...mapState({
            isVisibleActivityAlertSuccess: state => state.Alert.isVisibleActivityAlertSuccess
        }),
        ...mapState('Activity',['activity']),
    },
    watch: {
        isVisibleActivityAlertSuccess(value){
            this.isVisible = value
        },
        activity(value){
            if (value) {
                this.activityName = value.title.text
                this.moduleSlug = value.module.slug
            }
        }
    },
    methods: {        
        star: function (num) {
            if (this.stars > num){
                return require('@/assets/images/components/feedback/star-full.png')
            }
            return require('@/assets/images/components/feedback/star-empty.png')
        },
        onHidden(){
            this.hideAlertActivitySuccess()
        },
        ...mapActions(['hideAlertActivitySuccess']),
    }    
}
</script>
