<template>
    <div class="vue-karaoke" @click="toggle">
        <div class="vue-karaoke-loading">
            <div 
                v-for="(number, index) in counters" 
                :key="number"
                class="vue-karaoke-loading-number" 
                :class="{'is-active': playing}"
                :style="{'--position': index}"
            >
                {{ number }}
            </div>
        </div>
        <div class="vue-karaoke-line">
            <div class="vue-karaoke-line-text">
                <span v-html="Splitting.html({ content: currentLine && currentLine.text, by: 'chars' })"></span>
            </div>
        </div>
        <div class="vue-karaoke-background">
            <div 
                v-for="(image, index) in images" 
                v-show="index === currentImageIndex"
                :key="image" 
                class="vue-karaoke-background-image"
                :style="{'background-image': `url(${image})`}"
            ></div>
        </div>
        <audio 
            ref="player" 
            class="hidden"
            controls
            type="audio/mp3"  
            :src="audioUrl"
        />
    </div>
</template>

<script>
import moment from 'moment'

import { parseSTRFile } from '@/utils/string'
import { getRndInteger } from '@/utils/numbers'

export default {
    model: {
        prop: 'playing',
        event: 'change'
    },
    props: {
        playing: {
            type: Boolean,
            default: false
        },
        images: {
            type: Array
        },
        delayStart: {
            type: Number,
            default: 3
        },
        volume: {
            type: Number,
            default: 0.5
        },
        audioUrl: null,
        subtitleUrl: null
    },
    data() {
        return {
            subtitles: [],
            currentLine: null,
            currentImageIndex: 0,
            playTimeoutId: null,
            sortImageIntervalId: null
        }
    },    
    computed: {
        player(){
            return this.$refs.player
        },        
        splitting(){
            return this.$refs.splitting
        },
        currentImage(){
            return this.images[this.currentImageIndex]
        },
        counters(){
            const numbers = []
            for (let i=this.delayStart; i > 0 ; i--){
                numbers.push(i)
            }
            return numbers
        }
    },
    watch: {
        playing(nextValue){
            nextValue ? this.play() : this.pause()
        },
        volume(nextValue) {
            this.player.volume = nextValue
        }
    },
    async mounted() {
        this.bindingsEvents()
        await this.fetchSubtitle()
    },
    methods: {
        play() {
            if (this.playTimeoutId) {
                return
            }

            this.$emit('change', true)
            
            this.playTimeoutId = setTimeout(() => {
                this.player.play()
            }, this.delayStart * 1000)
        },
        pause() {
            this.player.pause()
            
            clearTimeout(this.playTimeoutId)
            clearInterval(this.sortImageIntervalId)

            this.$emit('change', false)

            this.playTimeoutId = null
            this.sortImageIntervalId = null
        },
        toggle(){
            !this.playing ? this.play() : this.pause()         
        },
        async fetchSubtitle(){
            const response = await fetch(this.subtitleUrl)
            const text = await response.text()
            this.subtitles = parseSTRFile(text)
        },
        bindingsEvents() {
            this.player.addEventListener('play', this.onPlay)
            this.player.addEventListener('canplay', this.canPlay)
            this.player.addEventListener('timeupdate', this.onTimeUpdate)
        },
        currentTime(){
            if (!this.player){
                return '00:00'
            }
            const time = moment('1970 00:00:00')
            time.add('seconds', this.player.currentTime)
            return time.format('mm:ss')
        },
        duration(){
            if (!this.player){
                return '00:00'
            }
            const duration = moment('1970 00:00:00')
            duration.add('seconds', this.player.duration)
            return duration.format('mm:ss')
        },
        onTimeUpdate(){
            this.$emit('timeupdate', {
                currentTime: this.currentTime(),
                duration: this.duration(),
                progress: this.player.currentTime / this.player.duration
            })

            const nextLine = this.subtitles.find(line => {
                const currentDate = moment('1970 00:00:00')
                
                currentDate.add(this.player.currentTime, 'seconds')

                const startTime = moment(`1970 ${line.startTime}`)
                const endTime = moment(`1970 ${line.endTime}`)

                return currentDate
                    .isBetween(startTime, endTime)
            })

            if (nextLine) {
                this.currentLine = nextLine
            }            
        },
        canPlay() {
            this.player.volume = this.volume

            this.$emit('canplay', {
                currentTime: this.currentTime(),
                duration: this.duration()
            })            
        },
        onPlay() {
            this.sortImageIntervalId = setInterval(this.sortImage, 10000)            
        },
        sortImage() {
            this.currentImageIndex = getRndInteger(0, this.images.length - 1)
        }
    }
}
</script>

<style lang="scss">
.vue-karaoke {
    position: relative;
    width: 100%;
    min-height: 480px;
    &-loading {
        position: absolute;
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        z-index: 5;
        &-number {
            position: absolute;
            font-size: 52px;
            color: white;
            filter: drop-shadow(1px 1px 6px #000);
            opacity: 0;
            &.is-active {
                animation: fadeInOut 1s calc(var(--position) * 1s) ease-in;
            }
        }
    }
    &-line {
        position: absolute;
        bottom: 48px;
        left: 0;
        right: 0;
        text-align: center;
        z-index: 5;
        &-text {
            font-size: 36px;
            .word .char{
                filter: drop-shadow(1px 1px 6px #000);
                display: inline-block;
                animation: char 120ms calc(var(--char-index) * 120ms) forwards; 
                color: rgb(255, 197, 88);
            }
        }
    }
    &-background{
        position: absolute;
        width: 100%;
        height: 100%;
        &-image {
            background-size: cover;
            background-position: center center;
            width: 100%;
            height: 100%;
        }
    }
    .hidden {
        display: none;
    }
}

@keyframes char {
    0% {
        color: rgb(255, 197, 88);
    }
    100% {
        color: white;
    }    
}

@keyframes fadeInOut {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
</style>