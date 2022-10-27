<template>
    <div id="my-cracha" class="container-fluid">
        <b-row
            align-h="center"
            :class="{
                column: !horizontal,
                reverse: reverse && horizontal,
                'reverse-column': reverse && !horizontal,
            }"
        >
            <b-col v-if="hasKeys" class="activity-keys">
                <b-row>
                    <b-col :sm="keyColSize" class="imagem">
                        <div class="item">
                            <ls-card-input-cracha class="cracha">
                                <div class="outer">
                                    <div
                                        class="card-input card--input-image"
                                        :class="{ 'no-photo-warning': hasNoImage }"
                                    >
                                        <div class="icon-photo">
                                            <input
                                                :ref="`file${name.text}`"
                                                style="display: none"
                                                type="file"
                                                accept="image/gif, image/jpeg, image/png"
                                                @change="handleFileUpload(name.text)"
                                            />
                                        </div>
                                        <div v-if="userName !== null" :ref="'imgContainer'" class="image">
                                            <div
                                                :style="{ backgroundImage: `url('${imgSrc}')` }"
                                                class="photo"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {{ name.text }}
                            </ls-card-input-cracha>
                        </div>
                    </b-col>
                    <div :class="{hidden: hiddenButton}">
                        <div class="btn-container">
                            <div class="btn-container--border">
                                <b-button class="btn-continue" v-if="!hasNoImage" @click="continueGame()">
                                    confirmar
                                </b-button>
                            </div>
                        </div>
                    </div>
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
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data() {
        return {
            userName: null,
            hasImage: false,
            hasNoImage: false,
            hiddenButton: true,
        }
    },
    computed: {
        name() {
            return this.userName ? this.userName : { text: 'Fulano' }
        },
        imgSrc() {
            return this.userName && this.userName.imgSrc ? this.userName.imgSrc : ''
        },
    },
    mounted() {
        this.createAnswersArray()
        if (this.userName === null) this.userName = this.getKeys[0]
    },
    methods: {
        ...mapActions('Activity', ['triggerSuccess']),
        handleHiddenButton() {
            this.hiddenButton = false
        },
        handleFileUpload(index) {
            this.hasNoImage = false
            let file = this.$refs[`file${index}`].files[0]
            let reader = new FileReader()

            reader.onload = (e) => {
                Vue.set(this.userName, 'imgSrc', e.target.result)
                //adicionando o background liso após a foto ser carregada
                this.$refs['imgContainer'].classList.add('grey-bg')
                this.hasImage = true
            }
            reader.onerror = function (error) {
                console.log(error)
            }
            if (file) {
                reader.readAsDataURL(file) 
                this.handleHiddenButton()
            }
        },
        continueGame() {
            if (this.hasImage) {
                setTimeout(this.triggerSuccess, 400)
            } else {
                this.hasNoImage = true
            }
        },
    },
}
</script>

<style lang="scss">
#my-cracha {
  .cracha {
    width: 450px;
    font-size: 24px;
  }
  .cracha-text {
    top: 40%;
  }
  .outer {
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
      @include embed_image("~@/assets/images/icons/comecar/photo-camera.png", 30px, 24px);
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
  .image {
    width: 100%;
    border-radius: 8px;
    .photo {
      height: 95px;
      width: 100%;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
  .grey-bg {
    background-color: #ececec;
  }
  .no-photo-warning {
    border: 2px solid red;
  }

  .btn-container {
    box-shadow: 0px 5px 6px grey;
    border-radius: calc(1.15rem * 0.8);
    transition: transform 0.2s ease-in-out;
    background: #fc4a1a; /* fallback for old browsers */
    background: linear-gradient(
      to bottom,
      #f8d19a 10%, #fca036 80%
    );  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to bottom,
      #f8d19a 10%, #fca036 80%
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    .btn-container--border {
      background-color: transparent;
      cursor: pointer;
      padding: 0.125rem;
      border-radius: calc(1.15rem * 0.8);

      .btn-continue {
        background-color: transparent;
        width: 100%;
        text-transform: uppercase;
        color: white;
        border-radius: calc(1.15rem * 0.8);
        text-align: center;
        padding: 0.5rem 1rem;
        font-size: 24px;
        transition: box-shadow 0.2s ease-in-out;
        box-shadow: inset 0px 0px 0px 4px rgba(102, 102, 102, 0.2);
        cursor: pointer;
      }
    }
  }
  .btn-container:hover {
    transform: scale(1.02);
  }

  .hidden {
    display: none;
  }
}
</style>
