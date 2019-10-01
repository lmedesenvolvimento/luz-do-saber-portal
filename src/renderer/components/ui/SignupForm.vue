<template>
    <b-form class="d-flex justify-content-center" @submit.prevent="submitLogin">
        <b-card no-body class="mx-5 shadow">
            <b-card-body class="align-items-center d-flex flex-column">
                <h5>Digite seu nome abaixo para continuar.</h5>
                <div class="card-input card--input-text mt-2">
                    <label>
                        <b-card
                            no-body
                        >
                            <b-card-body>
                                <input
                                    id="input-name"
                                    v-model.trim="user.name"
                                    v-focus="true"
                                    type="text"
                                    maxlength="11"
                                    autocomplete="off"
                                    required
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
        submitLogin(){
            if (this.user.name.length >= 3 && this.user.name.length <= 11){
                if (this.user.name.match(/[^a-zA-Z\d\s:\u00C0-\u00FF]/g) === null) this.createUserDatabase(this.user)
                else this.errMsg = 'Proibido uso de símbolos.'
            }
            else{
                this.errMsg = (this.user.name.length < 3) ? 'Mínimo de 3 letras.' : 'Máximo de 11 letras.'
            }
            if (!this.errMsg){
                this.onSubmit()
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
