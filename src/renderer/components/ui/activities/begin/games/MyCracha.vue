<template>
    <div id="my-cracha" class="container-fluid">        
        <b-row align-h="center" :class="{'column': !horizontal,'reverse': (reverse && horizontal), 'reverse-column': ( reverse && !horizontal )}">
            <b-col v-if="hasKeys" class="activity-keys">
                <b-row>
                    <b-col :sm="keyColSize" class="imagem"> 
                        <div class="item">
                            <ls-card-input-cracha 
                                class="cracha" 
                            >
                                <div class="outer">
                                    <div class="card-input card--input-image" :class="{'no-photo-warning' : hasNoImage }">
                                        <div class="icon-photo">
                                            <input 
                                                :ref="`file${name.text}`"
                                                style="display: none"                                             
                                                type="file"     
                                                accept="image/gif, image/jpeg, image/png"                                         
                                                @change="handleFileUpload(name.text)"                 
                                            >
                                        </div>
                                        <div v-if="userName !== null" :ref="'imgContainer'" class="image">
                                            <div :style="{backgroundImage: `url('${imgSrc}')`}" class="photo" />
                                        </div>
                                    </div>
                                </div>
                                {{ name.text }}
                            </ls-card-input-cracha>
                        </div>
                    </b-col>
                    <div class="mx-1">
                        <div class="card--display btn-continue-container" @click="continueGame()">
                            <img class="btn-continue" src="@/assets/images/icons/escrever/icon-next.png" alt="Botão jogar">
                            <b-card
                                no-body
                            >
                                <b-card-body>
                                    <span class="span-spacing">Continuar</span>
                                </b-card-body>
                            </b-card>
                        </div>
                    </div>
                    <!-- <div class="icon-next" @click="continueGame()">Continuar</div> -->
                    <!-- <button @click="continueGame()">Continuar</button> -->
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { MapMixins, ListMixin, CreateAnswersMixins } from '@ui/activities/mixins'
import FormProps from '@ui/form'
import Vue from 'vue'

export default {
    components: {
        ...FormProps,
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins,],
    data() {
        return {
            userName: null,
            hasImage: false,
            hasNoImage: false,
        }
    },
    computed: {
        name() {
            return this.userName ? this.userName : {text: 'Fulano'}
        },
        imgSrc(){
            return this.userName && this.userName.imgSrc ? this.userName.imgSrc : ''
        }
    },
    mounted() {
        this.createAnswersArray()
        if (this.userName === null)
            this.userName = this.getKeys[0]
    },
    methods: {
        ...mapActions('Activity', ['triggerSuccess']),
        handleFileUpload(index) {
            this.hasNoImage = false
            let file = this.$refs[`file${index}`].files[0]
            let reader = new FileReader()

            reader.onload = e => {
                Vue.set(this.userName, 'imgSrc',e.target.result)
                //adicionando o background liso após a foto ser carregada
                this.$refs['imgContainer'].classList.add('grey-bg')
                this.hasImage = true
       
            }
            reader.onerror = function(error) {
                console.log(error)
            }
            if (file)
                reader.readAsDataURL(file)
        },
        continueGame(){
            if(this.hasImage){
                setTimeout(this.triggerSuccess, 400)
            }else{
                this.hasNoImage = true
                
            }
        }
    },
}
</script>

<style lang="scss">
    #my-cracha{
        .cracha{
            width: 450px;
            font-size: 24px;
        }
        .cracha-text{
            top: 40%;
        }
        .outer{
            position: relative;
            margin: 0 134px;
            bottom: 8px;
            width: 152px;
            height: 95px;
        }
        .card--input-image {
            padding: 0;
            z-index: 99;
            height: 95px;
            .icon-photo {
     
                width: 49px;
                position: absolute;
                height: 44px;
                cursor: pointer;
                z-index: 10;
                cursor: pointer;
                @include embed_image(
                    '~@/assets/images/icons/comecar/photo-camera.png',
                    30px,
                    24px
                );
            }
            .card-body {
                padding: unset !important;
            }

            input {
                width: 0;
                height: 0;
                visibility: hidden;
                outline: none;
            }
        }
        .image{
            width: 100%;
            border-radius: 8px;
            .photo{
                height: 95px;
                width: 100%;
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
            }
        }
        .grey-bg{
            background-color: #ececec;
        }
        .no-photo-warning{
            border: 2px solid red;
        }

        .btn-continue-container {
            position: relative;
            cursor: pointer;
        }
        .btn-continue {
            position: absolute;
            z-index: 10;
            left: 0px;
            top: 10px;
            width: 64px;
            height: 64px;
        }
        .span-spacing {
            padding-left: 50px;
        }
    }
   
</style>
