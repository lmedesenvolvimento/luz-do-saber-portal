<template>
    <div id="karaoke" class="fill container karaoke">
        <navbar
            :navbar-title="song.title"
            :navbar-subtitle="''"
        />
        <div class="gameplay">
            <div class="step-bars">
                <div
                    v-for="(value, index) in songs"
                    :key="index"
                    class="bar"
                    :class="{'active': songIndex === index, 'complete': index < songIndex}"
                    @click="songIndex = index"
                ></div>
            </div>
            <div class="gameplay-body">
                <div v-for="(s, index) in songs" :key="index.toString()" class="karaoke-song">
                    <div class="card--display karaoke-card">
                        <div v-if="index === songIndex" class="card">
                            <div class="card-body">
                                <Karaoke
                                    v-model="playing"
                                    :audio-url="s.audio"
                                    :subtitle-url="s.sub"
                                    :images="s.images"
                                    @canplay="canPlay"
                                    @timeupdate="timeUpdate"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="gameplay-footer">
                <div class="gameplay-footer-actions">
                    <div class="gameplay-footer-action d-flex w-100">
                        <div class="gameplay-footer-status">
                            <div class="title">{{ currentTime }} / {{ duration }}</div>
                        </div>
                        <div class="gameplay-footer-buttons flex d-flex">
                            <button @click.stop="prev">Anterior</button>
                            <button @click.stop="toogle">{{ playing ? 'Pause' : 'Play' }}</button>
                            <button @click.stop="next">Próxima</button>
                        </div>
                        <div class="gameplay-footer-buttons">
                            <button>Abaixar</button>
                            Volume
                            <button>Aumentar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'

import Navbar from '../ui/navbars/Navbar'
import Karaoke from '../ui/Karaoke'

export default {
    components: { Navbar, Karaoke },
    data() {
        return {
            songs: [
                { 
                    title: 'Is this love', 
                    arstist: 'Bob Marley',
                    audio: require('@/assets/songs/BOB MARLEY - IS THIS LOVE/BOB MARLEY - IS THIS LOVE.mp3'),
                    sub: require('@/assets/songs/BOB MARLEY - IS THIS LOVE/BOB MARLEY - IS THIS LOVE.str'),
                    images: [
                        'https://source.unsplash.com/user/erondu',
                        'https://source.unsplash.com/user/polarmermaid',
                        'https://source.unsplash.com/user/guillaumeissaly29'
                    ],
                },
                { 
                    title: 'House Of The Rising Sun', 
                    arstist: 'The Animals',
                    audio: require('@/assets/songs/The Animals House Of The Rising Sun/The Animals House Of The Rising Sun.mp3'),
                    sub: require('@/assets/songs/The Animals House Of The Rising Sun/The Animals House Of The Rising Sun.str'),
                    images: [
                        'https://source.unsplash.com/user/guillaumeissaly29',
                        'https://source.unsplash.com/user/erondu',
                        'https://source.unsplash.com/user/polarmermaid'
                    ]
                }
            ],
            playing: false,
            songIndex: 0,
            currentTime: '00:00',
            duration: '00:00'
        }
    },
    computed: {
        song(){
            return this.songs[this.songIndex]
        },
        karaokeRef(){
            const ref = this.$refs[`karaoke-${this.songIndex}`]
            return ref ? ref : null
        },
        getModuleImage(){
            return require('@/assets/images/btn-books.png')
        },
        ...mapState('Modules', ['activeModule'])
    },
    watch: {
        songIndex() {
            this.playing = false
        }
    },
    methods: {
        next() {
            if (this.songIndex < this.songs.length - 1) {
                this.songIndex++
            }
        },
        prev(){
            if (this.songIndex > 0) {
                this.songIndex--
            }
        },
        toogle() {
            this.playing = !this.playing
        },
        canPlay({ duration, currentTime }){
            this.duration = duration
            this.currentTime = currentTime
        },
        timeUpdate(payload){
            const { duration, currentTime } = payload
            this.$set(this, 'duration', duration)
            this.$set(this, 'currentTime', currentTime)
        }
    }
}
</script>

<style lang="scss">
.karaoke {
    &-song {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        .vue-karaoke {
            width: 100%;
            min-height: 480px;
        }
    }
    &-card {
        width: 780px;
        height: 520px;
        margin: auto;
    }
    .gameplay {
        &-body {
            position: relative;
        }
        &-footer {
            &-buttons {
                justify-content: center;
            }
        }
    }
}
</style>