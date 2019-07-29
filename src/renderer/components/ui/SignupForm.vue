<template>
    <b-form class="d-flex justify-content-center" @submit.prevent="submitLogin">
        <b-card no-body class="mx-5 front-page-login card shadow">
            <b-card-body>
                <h5>Digite seu nome abaixo para continuar.</h5>
            </b-card-body>
            <b-card-body>
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
            </b-card-body>
            <b-card-body>
                <h6>{{ errMsg }}</h6>
            </b-card-body>
            <b-card-body>
                <b-button type="submit" variant="link" class="mt-3">
                    <div class="icon-next"></div>
                </b-button>
            </b-card-body>
        </b-card>
    </b-form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data(){
        return {
            user: { name: ''},
            errMsg: ''
        };
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
        },
        ...mapActions('User',['createUserDatabase']),
    }
}
</script>

<style>
.err-msg{
    color: red;
}
</style>
