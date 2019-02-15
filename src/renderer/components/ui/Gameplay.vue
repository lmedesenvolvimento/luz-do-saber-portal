<template>
    <div class="card gameplay">
        <div class="step-bars">
            <div class="bar active"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
        </div>
        <div class="card-heading">
            <div class="gameplay-counter counter">
                <span>1</span>
            </div>
            <div class="card-heading-title">Crachá</div>
        </div>
        <div class="card-body">
            <div class="gameplay-description">
                <p>Encontre o crachá que tem seu nome:</p>
                <div class="exercise-sample">
                    <div 
                        class="image-selector" 
                        v-on:click="onSelectName(index)"
                        v-bind:class="{ 'disabled': name.disabled }" 
                        v-bind:key="index" 
                        v-for="(name, index) in names" 
                        :title="name.value">
                    </div>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <div class="card-footer-actions">
                <div class="flex"></div>
                <div class="card-footer-action">
                    <div class="gameplay-footer-status">
                        <div class="subtitle">Tempo</div>
                        <div class="title">{{ getDuration }}</div>
                    </div>
                </div>
                <div class="gameplay-footer-divider"></div>
                <div class="card-footer-action">
                    <div class="gameplay-footer-status">
                        <div class="subtitle">Tentativas</div>
                        <div class="title">{{ chanceCounter }}</div>
                    </div>
                </div>
                <div class="flex"></div>
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment'

import { setInterval, clearInterval } from 'timers'

const WAIT_TIME = 1000

export default {
    name: 'ls-gameplay',
    data(){
        return {
            names: [
                {
                    value: 'Cármem',
                    disabled: false
                },
                {
                    value: 'Maximilianno',
                    disabled: false
                },
                {
                    value: 'Lúcia',
                    disabled: false
                },
                {
                    value: 'Sávio',
                    disabled: false
                },
                {
                    value: 'Camila',
                    disabled: false
                },
                {
                    value: 'Cláudia',
                    disabled: false
                }
            ],
            correctOption: 3,
            chanceCounter: 0,
            now: 0,
            timer: null
        }
    },
    methods: {
        onSelectName(index){
            if(this.names[index].disabled) return

            if(this.correctOption === index){
                clearInterval(this.timer)
                alert("Parabéns você concluiu!!!")
            } else{
                this.names[index].disabled = true
                this.chanceCounter++
            }
        }
    },
    computed: {
        getDuration(){
            return moment(this.now).format('mm:ss')
        }
    },
    created(){
        this.timer = setInterval(() => {
            this.now += WAIT_TIME
        }, WAIT_TIME)
    }
}
</script>
