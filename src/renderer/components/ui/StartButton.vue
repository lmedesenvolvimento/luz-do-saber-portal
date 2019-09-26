<template>
    <div class="mx-5">
        <div class="card--display btn-play-container" @click="gameStart">
            <img class="btn-play" src="@/assets/images/icons/btn-play.png" alt="Botão jogar">
            <b-card
                no-body
            >
                <b-card-body>
                    <span class="span-spacing">jogar</span>
                </b-card-body>
            </b-card>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        onClickStartButton: {
            type: Function,
            required: true
        }
    },
    data() {
        return {
            firstAudio: null,
            secondAudio: null,
        }
    },
    created() {
        this.loadAudio()
    },
    methods: {
        loadAudio() {
            this.firstAudio = new Audio()
            this.firstAudio.src = require('@/assets/audios/1-bem-vindo.mp3')

            this.secondAudio = new Audio()
            this.secondAudio.src = require('@/assets/audios/2-seu-nome.mp3')
        },
        gameStart() {
            this.onClickStartButton()

            this.firstAudio.play()

            window.setTimeout(function() {
                this.secondAudio.play()
            }.bind(this), 4000)
        },
    }
}
</script>

<style>
.btn-play-container {
    position: relative;
    cursor: pointer;
}
.btn-play {
    position: absolute;
    z-index: 10;
    right: 100px;
    top: -4px;
    width: 92px;
    height: 92px;
}
.span-spacing {
    padding-left: 50px;
}
</style>
