<template>
    <div
        id="escrever"
        class="page-container escrever"
    >
        <navbar
            navbar-title="Escrever"
            :navbar-subtitle="''"
            :navbar-icon="getModuleImage"
        />
        
        <div class="page-container-wrap-spacing">
            <b-row>
                <b-col v-for="theme in getWriteThemes" :key="theme.id" cols="12" md="6">
                    <div class="write-theme-card">
                        <div class="write-theme-card-icon">
                            <img :src="getModuleImage" alt="">
                        </div>
                        <div class="write-theme-card-title">
                            <h2>{{ theme.title }}</h2>
                        </div>                        
                    </div>
                </b-col>
            </b-row>
            <router-link :to="{ name: 'letter' }">Carta</router-link>
        </div>        
    </div>
</template>

<script>
import Navbar from '../ui/navbars/Navbar'
export default {
    components: { Navbar },
    computed: {
        getModuleImage(){
            return require('@/assets/images/btn-write.png')
        },
        getBackgroundCardModule(){
            return require('@/assets/images/write-module-background.png')
        },
        getWriteThemes(){
            return [
                {
                    title: 'Editor de Texto'
                },
                {
                    title: 'Jornal'
                },
                {
                    title: 'Lista'
                },
                {
                    title: 'Cartão de Aniversário'
                }
            ]
        }       
    }
}
</script>

<style lang="scss">
    .write-theme-card {
        background-image: url('~@/assets/images/write-module-background.png');
        background-position:  center;
        background-repeat:  no-repeat;        
        text-align: center;
        width: 378px;
        height: 188px;
        border-radius: 10px;
        margin: 0 auto 100px;
        box-shadow: 0px 0px 36px 1px rgba(123, 123, 132, 0.48);
        padding: 50px;
        .write-theme-card-icon{
            margin: -125px auto 0;
            width: 150px;
            height: 150px;
            background-color: #007CB2;
            border: solid 5px;
            border-color: white;
            border-radius: 75px;
            img{
                width: 150px;
                height: 150px;
            }

        }
        .write-theme-card-title{
            margin-top: 20px;
        }
    }
</style>
