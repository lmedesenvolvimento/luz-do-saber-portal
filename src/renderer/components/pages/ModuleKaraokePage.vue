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
                                    :volume="volume"
                                    @canplay="canPlay"
                                    @timeupdate="timeUpdate"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="karaoke-progress">
                <span class="karaoke-progress-line" />
                <span class="karaoke-progress-current-progress" :style="{'width': `${progress}%`}" />
            </div>
            <div class="gameplay-footer">
                <div class="gameplay-footer-actions">
                    <div class="gameplay-footer-action d-flex w-100">
                        <div class="gameplay-footer-status">
                            <div class="title">{{ currentTime }} / {{ duration }}</div>
                        </div>
                        <div class="gameplay-footer-buttons flex d-flex">                            
                            <div 
                                class="btn-karaoke-back" 
                                aria-label="Anterior"
                                @click.stop="prev" 
                            ></div>
                            <div 
                                v-show="!playing"
                                class="btn-karaoke-play" 
                                aria-label="Tocar"
                                @click.stop="toogle" 
                            ></div>
                            <div 
                                v-show="playing"
                                class="btn-karaoke-pause" 
                                aria-label="Pausar"
                                @click.stop="toogle" 
                            ></div>
                            <div 
                                class="btn-karaoke-next" 
                                aria-label="Próxima"
                                @click.stop="next" 
                            ></div>
                        </div>
                        <div class="gameplay-footer-buttons d-flex gameplay-footer-buttons--navigation">
                            <div 
                                class="btn-karaoke-volume-more" 
                                aria-label="Aumentar Volume"
                                @click.stop="incrementVolume" 
                            ></div>
                            <div class="icon-volume"></div>
                            <div 
                                class="btn-karaoke-volume-minus" 
                                aria-label="Diminuir Volume"
                                @click.stop="decrementVolume" 
                            ></div>
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

import Http from '@/services/Http'

export default {
    components: { Navbar, Karaoke },
    data() {
        return {
            songs: [
                // { 
                //     title: 'Is this love', 
                //     arstist: 'Bob Marley',
                //     audio: require('@/assets/songs/BOB MARLEY - IS THIS LOVE/BOB MARLEY - IS THIS LOVE.mp3'),
                //     sub: require('@/assets/songs/BOB MARLEY - IS THIS LOVE/BOB MARLEY - IS THIS LOVE.str'),
                //     images: [
                //         'https://source.unsplash.com/user/erondu',
                //         'https://source.unsplash.com/user/polarmermaid',
                //         'https://source.unsplash.com/user/guillaumeissaly29'
                //     ],
                // },
                // { 
                //     title: 'House Of The Rising Sun', 
                //     arstist: 'The Animals',
                //     audio: require('@/assets/songs/The Animals House Of The Rising Sun/The Animals House Of The Rising Sun.mp3'),
                //     sub: require('@/assets/songs/The Animals House Of The Rising Sun/The Animals House Of The Rising Sun.str'),
                //     images: [
                //         'https://source.unsplash.com/user/guillaumeissaly29',
                //         'https://source.unsplash.com/user/erondu',
                //         'https://source.unsplash.com/user/polarmermaid'
                //     ]
                // }
            ],
            playing: false,
            songIndex: 0,
            currentTime: '00:00',
            duration: '00:00',
            progress: 0,
            volume: 0.5,
            karaokesData: null
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
            this.progress = 0
        }
    },
    async created() {
        await this.getKaraokes()
        this.karaokesData.map(async (el)=> {
            console.log(this.removeUrlParameters(el.audio))
            const obj = {
                title: el.title,
                arstist: '',
                audio: this.removeUrlParameters(el.audio),
                sub: el.lyrics.url,
                images: el.images.map((x)=> {
                    return x.url
                })
            }
            this.songs.push(obj)
        })
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
        incrementVolume(){
            if (this.volume < 1) {
                this.volume = this.volume + 0.25
            }
        },
        decrementVolume(){
            if (this.volume > 0) {
                this.volume = this.volume - 0.25
            }
        },
        toogle() {
            this.playing = !this.playing
        },
        canPlay({ duration, currentTime }){
            this.duration = duration
            this.currentTime = currentTime
        },
        timeUpdate({ duration, currentTime, progress }){
            this.$set(this, 'duration', duration)
            this.$set(this, 'currentTime', currentTime)
            this.$set(this, 'progress', progress * 100)
        },
        async getKaraokes(){
            let { data } = await Http.axios.get('https://editorluzdosaber.seduc.ce.gov.br/game/karaoke')
            this.karaokesData = data.karaokes
        },
        removeUrlParameters(url) {
            const str = '?'
            const urlString = String(url.url)            
            const result = urlString.substring(0, urlString.indexOf(str))            
            return result
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
            padding: 4px 16px !important;
            &-actions {
                height: 100% !important;
            }
            &-status {
                display: flex;
                padding: 0px !important;
                .title {
                    display: block;
                    margin: auto;
                }
            }
            &-buttons {
                align-items: center;
                justify-content: center;
                .icon-volume {
                    margin-left: 8px;
                    margin-right: 16px;
                }
                [class^=btn-]:not(:last-child){
                    margin-right: 8px;
                }
                &--navigation {
                    margin-left: 48px;
                }
            }
        }
    }
    &-progress {
        position: relative;
        width: 100%;
        height: 4px;
        &-current-progress {
            position: absolute;
            height: 4px;
            width: 0%;
            background-color: #910281;
            transition: width 0.2s ease-in;
        }
    }
}
</style>