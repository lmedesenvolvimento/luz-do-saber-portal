<template>
    <div @click="click">
        <div class="card-display" :class="$attrs.class">
            <b-card 
                no-body
            >
                <b-card-body>
                    {{ item.text }}
                </b-card-body>
            </b-card>
        </div>
    </div>
</template>

<script>
import FillBackground from '@/components/ui/helpers/FillBackground'

export default {
    props: {
        item: Object,
        template: Object,
    },
    data(){
        let audio = new Audio()
        audio.src = 'https://luz-do-saber-staging.herokuapp.com/audios/comecar/meu-nome/meu-primeiro-nome/1.mp3'

        return {
            audio
        }
    },
    mounted(){
        this.audio.addEventListener('play', this.play)
        this.audio.addEventListener('ended', this.ended)
        this.audio.addEventListener('playing', this.playing)
    },
    methods: {
        click(){
            this.audio.play()
            console.log(this.audio.duration)
        },
        ended(){
            console.log('terminou')
        },
        play(){
            console.log('iniciou')
        },
        playing(){
            console.log('tocando')
        }
    },
}
</script>

<style>

</style>
