<template>
    <div @click="click">
        <div class="card-display" :class="$attrs.class">
            <b-card 
                no-body
            >
                <div class="bbg" :style="{'background-image': 'linear-gradient(to right, #7db239, #7db239)', 'background-size': `${audioProgress}% 100%`, 'background-repeat': 'no-repeat', 'border-radius': '1em'}">
                    <b-card-body>
                        {{ item.text }}
                    </b-card-body>
                </div>
            </b-card>
        </div>
    </div>
</template>

<script>
import RadioInput from './RadioInput.vue'

export default {
    mixins: [RadioInput], 
    props: {
        item: Object,
        template: Object,
    },
    data(){
        let audio = new Audio()
        audio.src = 'https://luz-do-saber-staging.herokuapp.com/audios/comecar/meu-nome/meu-primeiro-nome/1.mp3'

        let audioProgress = 0

        return {
            audio,
            audioProgress,
        }
    },
    computed:{
        duration(){
            return this.audio.duration
        }
    },
    mounted(){
        this.audio.addEventListener('play', this.play)
        this.audio.addEventListener('ended', this.ended)
        this.audio.addEventListener('playing', this.playing)
        this.audio.addEventListener('timeupdate', this.progress)
    },
    methods: {
        click(){
            this.audio.play()
        },
        ended(){
            console.log('terminou')
            this.setAnswer({ 
                type: 'value', 
                data: this.item.id,
                vm: this
            })
        },
        play(){
            console.log('iniciou')
        },
        playing(){
            console.log('tocando')
        },
        progress(e){
            this.audioProgress = Math.floor((this.audio.currentTime / this.duration) * 100)
            return this.audioProgress
        },
    },
}
</script>

<style>

</style>
