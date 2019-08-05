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
    methods: {
        gameStart() {
            this.onClickStartButton()

            let audio = new Audio();
            audio.src = require('@/assets/audios/1-bem-vindo.mp3');
            audio.play();

            window.setTimeout(function() {
                let audio = new Audio();
                audio.src = require('@/assets/audios/2-seu-nome.mp3');
                audio.play();
            }, 3500);

            window.clearTimeout();
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
