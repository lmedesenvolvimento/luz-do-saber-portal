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
import uniqid from 'uniqid'
import { filter } from 'lodash'

import RadioInput from './RadioInput.vue'
import AudioReader from '@/services/AudioReader'

export default {
    mixins: [RadioInput], 
    props: {
        item: Object,
        template: Object,
    },
    data(){
        return {
            audio: null,
            audioProgress: 0,
        }
    },
    computed:{
        duration(){
            return this.audio.duration
        }
    },
    mounted(){
        this.audio = new Audio()
        this.audio.src = 'https://luz-do-saber-staging.herokuapp.com/audios/comecar/meu-nome/meu-primeiro-nome/1.mp3'
        this.audio.$uid = uniqid()
        this.audio.addEventListener('ended', this.ended)
        this.audio.addEventListener('timeupdate', this.progress)        
        AudioReader.playlist.push(this.audio)
    },
    methods: {
        click(){
            if (filter(AudioReader.playlist, { paused: false }).length) return
            this.audio.play()
        },
        ended(){
            this.setAnswer({ 
                type: 'value', 
                data: this.item.id,
                vm: this
            })
        },
        progress(){
            this.audioProgress = (this.audio.currentTime / this.duration) * 100
            return this.audioProgress
        },
    },
}
</script>

<style>

</style>
