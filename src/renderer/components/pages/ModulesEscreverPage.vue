<template>
    <div
        id="escrever"
        class="page-container escrever"
    >
        <navbar
            navbar-title="Módulo Escrever"
            :navbar-subtitle="'Temas'"
            :navbar-icon="getModuleImage"
        />
        <div class="page-container-wrap-spacing">
            <b-row>
                <b-col v-for="theme in getModules" :key="theme.key" cols="12" md="6">
                    <router-link :to="{ name: 'write-module', params: { escrever_id: theme.key } }">
                        <div class="write-theme-card">
                            <div class="write-theme-card-icon">
                                <img :src="theme.icon" :alt="theme.title">
                            </div>
                            <div class="write-theme-card-title">
                                <div>
                                    <h2>{{ theme.title }}</h2>
                                </div>                            
                            </div>                        
                        </div>
                    </router-link>
                </b-col>
            </b-row>
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
        getModules(){
            return this.$store.getters['WriteModule/getWriteModules']
        }
    }
}
</script>

<style lang="scss">
    .write-theme-card {
        background-image: url('~@/assets/images/write-module-background.png');
        background-position:  center;
        background-repeat:  no-repeat; 
        border-radius: 10px;
        box-shadow: 0px 0px 36px 1px rgba(123, 123, 132, 0.48);
        color: #777777;
        cursor: pointer;       
        text-align: center;
        width: 378px;
        height: 188px;        
        margin: 0 auto 100px;        
        padding: 50px;
        transition: transform 0.2s ease-in-out;
        &:hover{
            transform: scale(1.1);
        }
        .write-theme-card-icon{
            margin: -125px auto 0;
            width: 150px;
            height: 150px;
            background-color: #007CB2;
            border: solid 5px;
            border-color: white;
            border-radius: 75px;
            img{
                width: 140px;
                height: 140px;
            }

        }
        .write-theme-card-title{
            margin-top: 20px; 
            height: 80px;
            display: flex;
            justify-content: center;
            align-items: center;         
                                 
        }
    }
</style>
