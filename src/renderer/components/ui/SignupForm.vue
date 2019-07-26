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
                <h6>Máximo de 11 letras.</h6>
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
            user: { name: ''}
        };
    },
    methods: {
        submitLogin(){
            this.createUserDatabase(this.user)
        },
        ...mapActions('User',['createUserDatabase']),
    }
}
</script>

<style>

</style>
