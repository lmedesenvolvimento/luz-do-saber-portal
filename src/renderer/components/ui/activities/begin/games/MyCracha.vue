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
                                    <div class="card-input card--input-image">
                                        <div class="icon-photo">
                                            <input
                                                :id="`file${name.text}`"
                                                :ref="`file${name.text}`"
                                                type="file"
                                                name="my-image"
                                                accept="image/jpeg, image/png"
                                                autocomplete="off"
                                                @change="
                                                    handleFileUpload(name.text)
                                                "
                                            />
                                        </div>
                                    </div>
                                    <async-image
                                        v-if="name.images[0] === null"
                                        class="img-placeholder"
                                        src="https://flash.za.com/wp-content/uploads/2015/08/Generic-Profile-1600x1600.png"
                                        alt="placeholder"
                                    />
                                    <div v-else class="image">
                                        <img :src="name.images[0]" class="photo" />
                                    </div>
                                </div>
                                {{ name.text }}
                            </ls-card-input-cracha>
                        </div>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import { MapMixins, ListMixin, CreateAnswersMixins } from '@ui/activities/mixins'
import FormProps from '@ui/form'

export default {
    components: {
        ...FormProps,
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins,],
    data() {
        return {
            userName: Object
        }
    },
    computed: {
        name() {
            return this.userName ? this.userName : {text: 'Fulano'}
        }
    },
    mounted() {
        this.createAnswersArray()
        this.userName = this.getKeys[0]
    },
    methods: {
        handleFileUpload(index) {
            let file = this.$refs[`file${index}`].files[0]
            let reader = new FileReader()

            // reader.onload = e => {
            //     this.userName.imgSrc = e.target.result
            // }
            // reader.onerror = function(error) {
            //     console.log(error)
            // }
            // console.log('file', file)
            // reader.readAsDataURL(file)

            reader.onloadend = function () {
                this.userName.images.push(reader.result)
            }
            if (file) {
                reader.readAsDataURL(file)
            }
        },
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
            border: 1px solid black;
            position: relative;
            margin: 0 134px;
            bottom: 8px;
            width: 152px;
            height: 95px;
        }
        .card--input-image {
            display: flex;
            justify-content: center;
            top: -10px;
            position: relative;
            right: 50px;
            z-index: 99;

            .icon-photo {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 49px;
                height: 44px;
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
            bottom: 60px;
            width: 150px;
            height: 95px;
        }
    }
</style>
