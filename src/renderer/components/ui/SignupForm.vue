<template>
    <b-form class="d-flex justify-content-center" @submit.prevent="submitLogin">
        <b-card no-body class="mx-5 shadow">
            <b-card-body class="align-items-center d-flex flex-column">
                <h5>Digite seu nome ou código abaixo para continuar.</h5>
                <div class="card-input card--input-text mt-2">
                    <label>
                        <b-card
                            no-body
                        >
                            <b-card-body>
                                <input
                                    id="input-name"
                                    v-model="user.name"
                                    v-focus="true"
                                    type="text"
                                    maxlength="11"
                                    autocomplete="off"
                                    required
                                    @input.prevent="onInput"
                                />
                            </b-card-body>
                        </b-card>
                    </label>
                </div>
                <h6 :class="{ 'err-msg': errMsg }">{{ errMsg }}</h6>
                <b-button type="submit" variant="link">
                    <div class="icon-next"></div>
                </b-button>
            </b-card-body>
        </b-card>
    </b-form>
</template>

<script>
import { mapActions } from 'vuex'

import Http from '@/services/Http'



const REGEX_SYMBOLS = /[^\w\s:\u00C0-\u00FF]/g

export default {
    props: {
        onSubmit: {
            type: Function,
            required: false
        }
    },
    data(){
        return {
            user: { name: ''},
            errMsg: ''
        }
    },
    methods: {
        onInput(event) {
            const result = event.target.value.replace(/[\s]/g, '')
            this.$set(this.user, 'name', result)
        },
        async submitLogin(){
            this.errMsg = null

            if (this.user.name.length >= 3 && this.user.name.length <= 11){
                const userName = this.user.name
                
                if (userName.match(REGEX_SYMBOLS)) {
                    this.errMsg = 'Proibido uso de símbolos.'
                    return
                }
                
                if (userName.match(/[\d]/g)) {                    
                    try {                        
                        const { data } = await Http.axios.get(`/game/user_game/me/${userName.toUpperCase()}`)
                        this.createUserDatabase({name: data.firstName })
                        this.onSubmit()
                    } catch (error) {
                        this.errMsg = 'Código não exite ou não encontrado.'
                    }
                    return
                }

                this.createUserDatabase(this.user)
                this.onSubmit()
            } else {
                this.errMsg = (this.user.name.length < 3) ? 'Mínimo de 3 letras.' : 'Máximo de 11 letras.'
            }
        },
        ...mapActions('User',['createUserDatabase']),
    }
}
</script>

<style scoped>
.err-msg{
    color: red;
}
</style>
