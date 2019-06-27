<template>
    <div v-if="unit" class="gameplay">
        <div class="step-bars">
            <div
                v-for="(value, index) in unit.questions"
                :key="index"
                class="bar"
                :class="{'active': getPosition == ( index + 1 ), 'complete': index < getPosition}"
                @click="goActivity(index + 1)"
            ></div>
        </div>
        <div class="gameplay-heading">
            <div class="gameplay-navigation">
                <transition name="fade" mode="in-out">
                    <div v-if="getPosition > 1" key="nav-prev" class="gameplay-navigation-prev">
                        <b-btn variant="link" @click.stop="prevActivity">
                            <div class="icon-prev"></div>
                        </b-btn>
                    </div>
                </transition>
                <transition name="fade" mode="in-out">
                    <div v-if="getPosition < unit.questions.length" key="nav-next" class="gameplay-navigation-next">
                        <b-btn variant="link" @click.stop="nextActivity">
                            <div class="icon-next"></div>
                        </b-btn>
                    </div>
                </transition>
            </div>
            <div class="gameplay-counter counter">
                <span>{{ getPosition }}</span>
            </div>
            <div class="gameplay-heading-title">{{ getTitle }}</div>
        </div>
        <router-view />
        <div class="gameplay-footer">
            <div class="gameplay-footer-actions">
                <div class="flex"></div>
                <div class="gameplay-footer-action">
                    <ls-timer></ls-timer>
                </div>
                <div class="gameplay-footer-divider"></div>
                <div class="gameplay-footer-action">
                    <div class="gameplay-footer-status">
                        <div class="subtitle">Tentativas</div>
                        <div class="title">{{ log.errors.total }}</div>
                    </div>
                </div>
                <div class="flex"></div>
            </div>
        </div>
        <ls-alert-activity-success></ls-alert-activity-success>
    </div>
</template>
<script>
import ui from '@/components/ui'
import alerts from '@/components/alerts'
import { mapActions, mapState } from 'vuex'

import { first, findIndex } from 'lodash'

export default {
    components: {
        'ls-timer': require('@/components/ui/helpers/Timer').default,
        ...alerts
    },
    computed: {
        getPosition(){
            return this.navigator.order
        },
        getTitle(){
            return this.activity ? this.activity.title.text : ''
        },
        getDescription(){
            return this.activity && this.activity.statement ? this.activity.statement.text : ''
        },
        ...mapState('Unit', ['unit', 'navigator']),
        ...mapState('Activity', ['activity','answers', 'log'])
    },
    created(){
        const { params } = this.$route
        const position = parseInt(params.position)
        this.$router.push({
            name: 'activity',
            params: {
                position: position || this.unit.questions[0].order
            }
        })
    },
    methods: {
        ...mapActions('Unit', ['goActivity', 'nextActivity', 'prevActivity','setNavigatorOrder'])
    }
}
</script>
