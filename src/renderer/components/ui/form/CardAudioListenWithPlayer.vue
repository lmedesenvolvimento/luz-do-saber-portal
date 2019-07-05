<template>
    <div class="card--display" :class="$attrs.class">
        <b-card
            no-body
        >
            <b-card-body>
                <slot>
                    <p>Fugiat laborum non adipisicing cillum veniam mollit.</p>
                </slot>
            </b-card-body>
            <b-card-footer>
                <!-- <vue-plyr> -->
                <vue-plyr :options="playerOptions">
                    <audio>
                        <source :src="uri" type="audio/mp3" />
                    </audio>
                </vue-plyr>
            </b-card-footer>
        </b-card>
    </div>
</template>

<script>
import RadioInput from './RadioInput.vue'
export default {
    mixins: [RadioInput],
    data () {
        return {
            uri: 'https://luz-do-saber-staging.herokuapp.com/audios/comecar/meu-nome/meu-primeiro-nome/1.mp3',
            options: {

            }
        }
    },
    computed: {
        playerOptions() {
            const options = {
                controls: ['play', 'progress']
            }
            return options
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
</style>
