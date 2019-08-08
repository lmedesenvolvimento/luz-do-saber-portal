<template>
    <div v-if="isLimitExceeded">
        <div v-if="isPlayerWithImage">
            <div class="card--text-audio">
                <div :class="activity.item_template.key.font_size" class="text-audio-image-box">
                    <card-display>
                        <slot>
                            <b-col>
                                <b-row>
                                    <b-col cols="7">
                                        <pre>{{ item.text }}</pre>
                                    </b-col>
                                    <b-col>
                                        <async-image :src="item.images.length ? item.images[0].url : null" />
                                    </b-col>
                                </b-row>
                            </b-col>
                            <hr>
                            <card-audio ref="plyr" :item="item" class="plyr-flat" />
                        </slot>
                    </card-display>
                </div>
            </div>
        </div>
        <div v-else class="card--text-audio">
            <card-display>
                <slot>
                    {{ item.text }}
                </slot>
                <template slot="footer">
                    <b-card-footer>
                        <card-audio ref="plyr" :item="item" class="plyr-flat" />
                    </b-card-footer>
                </template>
            </card-display>
        </div>
    </div>
    <div v-else class="card--display card-inline-player" :class="$attrs.class">
        <b-card
            no-body
            :class="{ 'valid': valid }"
        >
            <b-card-body>
                <b-container fluid>
                    <b-row align-v="center" align-h="center">
                        <div class="inline-player">
                            <vue-plyr ref="plyr" :options="playerOptions">
                                <audio>
                                    <source :src="uri" type="audio/mp3" />
                                </audio>
                            </vue-plyr>
                        </div>
                        <slot>
                            <span class="flex text-center">
                                {{ item.text }}
                            </span>
                        </slot>
                    </b-row>
                </b-container>
            </b-card-body>
        </b-card>
    </div>
</template>

<script>
import uniqid from 'uniqid'
import { filter } from 'lodash'
import { mapActions } from 'vuex'

import AsyncImage from '@ui/AsyncImage'
import RadioInput from './RadioInput.vue'
import CardAudio from './CardAudio'
import CardDisplay from './CardDisplay'

const limitText = 50

export default {
    components: {AsyncImage, CardAudio, CardDisplay },
    mixins: [RadioInput],
    props: {
        item: Object,
        template: Object,
        uri: {
            type: String,
            required: true
        }
    },
    data(){
        return {
            valid: false
        }
    },
    computed:{
        isLimitExceeded() {
            return this.item.text.length > limitText
        },
        playerOptions() {
            const options = {
                volume: 1,
                controls: ['play'],
                keyboard: { focused: false, global: false }
            }
            return options
        },
        player() {
            return this.$refs.plyr.player
        },
        isPlayerWithImage() {
            return (this.item.images[0].url != null) && (this.item.value_ids == null)
        }
    },
    mounted(){
        this.player.on('ended', this.ended)
        this.player.volume = 0.7
    },
    methods: {
        ...mapActions('Activity', ['triggerSuccess']),
        ended(){
            this.valid = true

            if(this.isPlayerWithImage){
                this.triggerSuccess();
            } else {
                this.setAnswer({
                    type: 'value',
                    data: this.item.id,
                    vm: this
                })
            }
        },
    },

}
</script>

<style>
    .text-audio-image-box{
        margin-top: -20px;
    }
</style>

