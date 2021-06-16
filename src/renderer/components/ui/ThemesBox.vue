<template>
    <div id="themes-box">
        <div v-if="totalQuestionsComplete > 0" class="report-button btn-report" @click.prevent="showSuccess"></div>
        <b-row class="mx-4 p-2 header-unit" :style="{ backgroundColor: themeColor }"> 
            <h2 class="unit-title">{{ unit.title }}</h2>
        </b-row>
        <b-row class="unit-body" :style="{ backgroundColor: themeColor }">
            <b-col class="unit-info px-4 pt-3">
                <b-row class="px-3"><h3>ATIVIDADES:</h3></b-row>
                <b-row class="px-3 py-1 activities-completed">{{ totalQuestionsComplete }}/{{ totalQuestions }}</b-row>
                <b-row class="pt-2 mx-1 line" />
                <b-row class="px-3 pt-2 pb-3 stars">
                    <b-col class="star" :class="{ 'empty': totalStars <= 1 }" />
                    <b-col class="star" :class="{ 'empty': totalStars <= 2 }" />
                    <b-col class="star" :class="{ 'empty': totalStars <= 2.5 }" />
                </b-row>
            </b-col>
            <b-col class="container-unit-image"> 
                <async-image :src="unit.cover_url" class="py-2">
                    <template slot="image">
                        <div class="unit-image" :style="{ 'background-image': `url(${unit.cover_url})` }" />
                    </template>
                </async-image>
            </b-col>            
        </b-row>
    </div>
</template>

<script>
import AsyncImage from '@ui/AsyncImage'
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'
import { mean, find } from 'lodash'

const MAX_STARS = 3

export default {
    components: { AsyncImage },
    props: {
        unit: {
            type: Object,
            require: true
        },
        themeColor: {
            type: String
        },
        theme: {
            type: Object
        }
    },
    computed: {
        completeQuestions(){
            return this.$store.getters['Pointings/getPointingsActivitiesByUnitId'](this.unit.id)
        },
        totalQuestionsComplete(){
            return this.completeQuestions.length
        },
        totalQuestions(){
            return this.unit.questions.length
        },
        totalStars(){
            const stars = this.unit.questions.length ? ( MAX_STARS * this.unit.questions.length ) : 0
            const totalCompleteStars = this.unit.questions.map((q, index) => this.mapTotalCompleteStars(q, index))
            return mean(totalCompleteStars) // calc for mean
        }
    },
    methods: {
        mapTotalCompleteStars(question, index){
            return this.completeQuestions[index] 
                ? this.completeQuestions[index].pointings.totalStars 
                : 0 
        },
        showSuccess() {
            this.showAlertActivitySuccess(null)
            const unit = {
                unit_id: this.unit.id,
                theme_id: this.unit.theme_id,
                module_id: this.theme.modulo_id
            }
            this.setModuleIdClicked(unit)
            // this.$store.dispatch('showAlertActivitySuccess', null, { root: true })
        },
        ...mapMutations(['setModuleIdClicked']),
        ...mapActions(['showAlertActivitySuccess', 'hideAlertActivitySuccess']),
    }
}
</script>
<style lang="scss" scoped>
    .btn-report {
        @include embed_image('~@/assets/images/icons/btn-relatorio.png', 62px, 62px);
        position: absolute;
        top: 44px;
        right: -13px;
        cursor: pointer;
        z-index: 10;
        transition: all 0.2s;
        &:hover {
            filter: drop-shadow(-3px 3px 3px #fcd55d);
            transform: scale(1.05);
        }
    }

</style>
