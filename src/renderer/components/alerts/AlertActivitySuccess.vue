<template>
    <b-modal
        ref="alert-success-modal"
        :modal-class="$context"
        content-class="feedback"
        :centered="true"
        :header-class="renderModuleSlug"
        :hide-footer="true"
        :no-close-on-backdrop="true"
        @show="onShow"
        @hide="onHidden"
    >
        <template slot="modal-header">
            <div class="feedback-header">
                <div class="feedback-stars feedback-header-item">
                    <img :src="star(0)" class="feedback-small-stars" alt="star" />
                    <img :src="star(1)" alt="star" />
                    <img :src="star(2)" class="feedback-small-stars" alt="star" />
                </div>
                <div class="feedback-header-item "><h5 class="feedback-rounded-number">{{ renderActivityPosition }}</h5></div>
                <div class="feedback-header-item"><h5>{{ renderActivityName }}</h5></div>
            </div>
        </template>
        <br>
        <div class="feedback-content">
            <img :src="expressionStar" alt="expression-star" />
            <br>
            <h5>{{ feedbackText1 }}</h5>
            <div v-if="totalStars==3" class="feedback-itim"><h5>{{ feedbackText5 }}</h5></div>
            <div class="feedback-itim"><h5>{{ feedbackText2 }} <span class="feedback-golden">{{ feedbackText3 }}</span>{{ feedbackText4 }}</h5></div>
            <div v-if="totalStars!=3" class="feedback-itim"><h5>{{ feedbackText5 }}</h5></div>
        </div>
        <br>
        <div class="feedback-footer-buttons" :class="$route.params.module_slug">
            <div class="icon-redo" @click="resetActivity"></div>
            <div class="icon-next" @click="nextActivity"></div>
        </div>
    </b-modal>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { find } from 'lodash'

import AudioReader from '@/services/AudioReader'

const feedbackAudios  = [
    new Audio(require('@/assets/audios/feedback/0-star.mp3')),
    new Audio(require('@/assets/audios/feedback/01-star.mp3')),
    new Audio(require('@/assets/audios/feedback/02-stars.mp3')),
    new Audio(require('@/assets/audios/feedback/03-stars.mp3'))
]

export default {    
    data(){
        return {
            isVisible: false,
        }
    },
    computed: {
        feedbackText1: function () {
            switch(this.totalStars){
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
            switch(this.totalStars){
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
            switch(this.totalStars){
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
            if(this.totalStars == 3){
                return '!'
            }
            return '.'
        },
        feedbackText5: function () {
            switch(this.totalStars){
            case 0:
                return 'Tente novamente!'
            case 1:
                return 'Vamos tentar novamente?'
            case 2:
                return 'Deseja tentar novamente?'
            case 3:
                return 'Você completou a atividade'
            default:
                return ''
            }
        },
        expressionStar: function () {
            switch(this.totalStars) {
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
        renderModuleSlug(){
            return this.activity ? this.activity.module.slug : ''
        },
        renderActivityPosition(){
            return this.activity ? this.activity.position : ''
        },
        renderActivityName(){
            return this.activity ? this.activity.title.text : ''
        },
        ...mapState({
            isVisibleActivityAlertSuccess: state => state.Alert.isVisibleActivityAlertSuccess
        }),
        ...mapState('Unit',['unit']),
        ...mapState('Activity',['activity','log']),
        ...mapGetters('Activity',['totalStars'])
    },
    watch: {
        isVisibleActivityAlertSuccess(value){
            value ? this.$refs['alert-success-modal'].show() : this.$refs['alert-success-modal'].hide()
        },
    },
    methods: {
        star: function (num) {
            if (this.totalStars > num){
                return require('@/assets/images/icons/star-full.png')
            } else {
                return require('@/assets/images/icons/star-empty.png')
            }
        },
        onShow(){
            AudioReader.stop()
            this.triggerPlayAudioFeedback()
        },
        onHidden(){
            this.triggerStopAudioFeedback()
            this.hideAlertActivitySuccess()
        },
        resetActivity(){
            let { params } = this.$route
            const question = find(this.unit.questions, { order: this.activity.order })

            this.destroyActivity()

            AudioReader.stop()

            this.fetchActivity({
                params,
                question
            }).then(() => {
                if (this.activity) AudioReader.simplePlay(this.activity.statement.audio)
            })

            this.onHidden()
        },
        nextActivity(){
            this.$store.dispatch('Unit/nextActivity')
            this.destroyActivity()
            this.onHidden()
        },
        triggerPlayAudioFeedback(){
            try {                
                return feedbackAudios[this.totalStars].play()            
            } catch (error) {
                console.warn(error)
            }
        },
        triggerStopAudioFeedback(){
            feedbackAudios.forEach(audio => {
                try {
                    audio.pause()
                    audio.currentTime = 0
                } catch (error) {
                    console.warn(error)
                }
            })
        },
        ...mapActions(['hideAlertActivitySuccess']),
        ...mapActions('Activity',['fetchActivity','destroyActivity'])
    }
}
</script>
