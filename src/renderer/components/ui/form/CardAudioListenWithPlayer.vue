<template>
    <div class="card--display" :class="$attrs.class">
        <b-card
            no-body
        >
            <b-card-body>
                <b-aspect :aspect="proportion" class="aspect-ratio">
                    <slot></slot>
                </b-aspect>
            </b-card-body>
            <b-card-footer>
                <div class="card--audio plyr-flat">
                    <vue-plyr ref="plyr" :options="playerOptions">
                        <audio>
                            <source :src="uri" type="audio/mp3" />
                        </audio>
                    </vue-plyr>
                </div>
            </b-card-footer>
        </b-card>
    </div>
</template>

<script>
import RadioInput from './RadioInput.vue'
export default {
    mixins: [RadioInput],
    props: {
        uri: {
            type: String,
            default: null
        },
        proportion: {
            type: String,
            default: '16:9'
        }
    },
    computed: {
        playerOptions() {
            const options = {
                controls: ['play', 'progress'],
                keyboard: { focused: false, global: false }
            }
            return options
        },
        player() {
            return this.$refs.plyr ? this.$refs.plyr.player : null
        }
    },
    mounted() {
        if (this.player) {
            this.player.volume = 0.7
        }
    }
}
</script>

<style lang="scss">
.plyr {
    .plyr__controls {
        background-color: transparent;
        justify-content: flex-start;
        > .plyr__control:first-child{
            margin-right: 0px;
        }
        > .plyr__progress__container{
            width: 100%;
        }
    }
}
.aspect-ratio .image img {
    max-height: 367px;
    max-width: 650px;
}
</style>
