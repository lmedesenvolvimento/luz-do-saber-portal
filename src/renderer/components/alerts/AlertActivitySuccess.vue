<template>
    <b-modal
        ref="alert-success-modal"
        :modal-class="[$context, renderModuleSlug, { 'is-report' : currentShow === 'report' }]"
        content-class="feedback"
        :centered="true"
        :header-class="[renderModuleSlug, { 'is-report' : currentShow === 'report' }]"
        :hide-footer="true"
        :no-close-on-backdrop="true"
        @show="onShow"
        @hide="onHidden"
    >
        <template slot="modal-header">
            <transition-group name="fade-feedback" class="transition">
                <div v-if="currentShow === 'feedback'" key="feedback" class="feedback-header">
                    <div class="btn-report" @click="showReport"></div>
                    <div class="feedback-stars feedback-header-item">
                        <img :src="star(0)" class="feedback-small-stars" alt="star" />
                        <img :src="star(1)" alt="star" />
                        <img :src="star(2)" class="feedback-small-stars" alt="star" />
                    </div>
                    <div class="feedback-header-item "><h5 class="feedback-rounded-number">{{ renderActivityPosition }}</h5></div>
                    <div class="feedback-header-item"><h5>{{ renderActivityName }}</h5></div>
                </div>
                <div v-if="currentShow === 'report'" key="report" class="feedback-header report">
                    <div v-if="!isTheme" class="btn-back" @click="showFeedback"></div>
                    <div class="feedback-header-item"><h5>Relatório de atividades</h5></div>
                    <div class="btn-close" @click="nextActivity"></div>
                </div>
            </transition-group>
        </template>
        <br>
        <div class="feedback-content" :class="{ 'report' : currentShow === 'report' }">
            <div v-if="currentShow === 'feedback'" class="content-feedback">
                <img :src="expressionStar" alt="expression-star" />
                <br>
                <h5>{{ feedbackText1 }}</h5>
                <div v-if="totalStars==3" class="feedback-itim"><h5>{{ feedbackText5 }}</h5></div>
                <div class="feedback-itim"><h5>{{ feedbackText2 }} <span class="feedback-golden">{{ feedbackText3 }}</span>{{ feedbackText4 }}</h5></div>
                <div v-if="totalStars!=3" class="feedback-itim"><h5>{{ feedbackText5 }}</h5></div>
            </div>
            <div v-if="currentShow === 'report'" class="content-report">
                <div class="report-table">
                    <div class="report-table-row title">
                        <div>
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        </div>
                        <div>
                            <span>Estrelas</span>
                        </div>
                        <div>
                            <span>Tempo</span>
                        </div>
                        <div>
                            <span>Tentativas</span>
                        </div>
                    </div>
                    <div class="report-table-row average">
                        <div>
                            <span>Média</span>
                        </div>
                        <div :class="`total-${getStarsAvg()}-stars`">
                            <span class="stars">
                                <span class="star"></span>
                                <span class="star"></span>
                                <span class="star"></span>
                            </span>
                        </div>
                        <div>
                            <span>{{ getTimeAvg() }}</span>
                        </div>
                        <div>
                            <span>{{ getErrorsAvg() }}</span>
                        </div>
                    </div>
                    <div v-for="atividade in currentActivities" :key="atividade.id" class="report-table-row">
                        <div>
                            <span>{{ atividade.title.text }}</span>
                        </div>
                        <div :class="`total-${atividade.pointings.totalStars}-stars`">
                            <span class="stars">
                                <span class="star"></span>
                                <span class="star"></span>
                                <span class="star"></span>
                            </span>
                        </div>
                        <div>
                            <span>{{ treatTime(atividade.timer.totalSeconds) }}</span>
                        </div>
                        <div>
                            <span>{{ atividade.errors.total }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <div class="feedback-footer-buttons" :class="$route.params.module_slug">
            <div v-if="currentShow === 'feedback'" class="feedback-buttons">
                <div class="icon-redo" @click="resetActivity"></div>
                <div class="icon-next" @click="nextActivity"></div>
            </div>
            <div v-if="currentShow === 'report'" class="report-buttons"></div>
        </div>
    </b-modal>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { find } from 'lodash'

import AudioReader from '@/services/AudioReader'
import { time } from 'uniqid'

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
            isTheme: false,
            currentShow: 'feedback',
            moduleByPath: '',
        }
    },
    computed: {
        currentActivities() {
            const { theme_id, unit_id, module_id } = this.activity || this.unitClicked
            const allActivities = Object.values(this.activities)
            return allActivities.filter((a) => a.theme_id === theme_id && a.unit_id === unit_id && a.module_id === module_id)
        },
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
            return this.activity ? this.activity.module.slug : this.moduleByPath
        },
        renderActivityPosition(){
            return this.activity ? this.activity.position : ''
        },
        renderActivityName(){
            return this.activity ? this.activity.title.text : ''
        },
        unitClicked() {
            return this.$store.state.Alert.moduleIdClicked
        },
        ...mapState({
            isVisibleActivityAlertSuccess: state => state.Alert.isVisibleActivityAlertSuccess
        }),
        ...mapState('Unit',['unit']),
        ...mapState('Pointings',['activities']),
        ...mapState('Activity',['activity','log']),
        ...mapGetters('Activity',['totalStars'])
    },
    watch: {
        isVisibleActivityAlertSuccess(value){
            value ? this.$refs['alert-success-modal'].show() : this.$refs['alert-success-modal'].hide()
            if(value) this.showFeedback()
        },
    },
    mounted() {
        if (this.$route.name === 'theme'){
            this.isTheme = true
            this.showReport()
        } else if (this.$route.name === 'activity') {
            this.isTheme = false
        }
        this.moduleByPath = this.$route.path.split('/')[2]
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
        showReport() {
            this.currentShow = 'report'
        },
        showFeedback() {
            if (!this.isTheme){
                this.currentShow = 'feedback'
            }
        },
        nextActivity(){
            if (!this.isTheme){
                this.$store.dispatch('Unit/nextActivity')
                this.destroyActivity()
                this.onHidden()
            } else {
                this.onHidden()
            }
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
        getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min)
        },
        getStarsAvg() {
            return Math.floor(this.currentActivities.reduce((acc, { pointings }) => pointings.totalStars + acc, 0) / this.currentActivities.length)
        },
        getTimeAvg() {
            const timeAvg = this.currentActivities.reduce((acc, { timer }) => timer.totalSeconds + acc, 0) / this.currentActivities.length
            return this.treatTime(timeAvg)
        },
        getErrorsAvg() {
            return Math.round(this.currentActivities.reduce((acc, { errors }) => errors.total + acc, 0) / this.currentActivities.length)    
        },
        treatTime(number) {
            let minutes = Math.floor(number / 60)
            let seconds = Math.floor(number % 60)
            minutes = minutes > 9 ? minutes : `0${minutes}`
            seconds = seconds > 9 ? seconds : `0${seconds}`
            return `${minutes}:${seconds}`
        },
        ...mapActions(['hideAlertActivitySuccess']),
        ...mapActions('Activity',['fetchActivity','destroyActivity'])
    }
}
</script>
