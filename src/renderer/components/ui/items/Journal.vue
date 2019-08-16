<template>
    <div class="journal-container">
        <div class="journal">
            <div class="journal-page-container">
                <div v-if="singlePage" class="journal-page">
                    <div class="journal-decoration-1" />
                    <div class="journal-decoration-2" />
                    <div class="journal-content">
                        <div class="journal-header-title">
                            <h3>INSIRA O NOME DO JORNAL</h3>
                        </div>
                        <div class="journal-header-image">
                        </div>
                        <div>
                            <div class="journal-header-story-left">
                                <div class="journal-header-story-title">
                                    <h5>TÍTULO DO LADO ESQUERDO</h5>
                                </div>
                                <div class="journal-header-story-subtitle">
                                    <p>Insira o conteúdo da matéria do lado esquerdo</p>
                                </div>
                            </div>                                
                            <div class="journal-header-story-right">
                                <div class="journal-header-story-title">
                                    <h5>TÍTULO DO LADO ESQUERDO</h5>
                                </div>
                                <div class="journal-header-story-subtitle">
                                    <p>Insira o conteúdo da matéria do lado esquerdo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="journal-decoration-1" />
                </div>
            </div>
        </div>
        <div class="journal-footer">
            a
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            singlePage: true
        }
    }
}
</script>

<style lang="scss">
    .journal-container{
        margin-top: 40px;
        box-shadow: 1px 1px 20px #3a3a3a;
        border-radius: 0px 0px 10px 10px;
        background-color: white;
    } 
    .journal{
        padding: 15px 45px 15px 45px; 
    }
    .journal-page{
        border-radius: 3px;
        background-color: #cccccc;
        padding: 10px 5px 5px 5px;
    }
    .journal-page-container{
        border: solid 3px;
        border-color: #dddddd;
        border-radius:10px;
        padding: 5px;
        margin: 0px auto 0 auto;
        width: 50%;        
    }
    .journal-decoration-1{
        background-color: #007CB2;
        border-radius: 2px; 
        height: 5px;
    }
    .journal-decoration-2{
        background-color: #007CB2;
        border-radius: 2px; 
        margin-top: 5px; 
        height: 20px;
        margin-bottom: 10px; 
    } 
    .journal-content{
        background-image: linear-gradient(-90deg,white, #dedede);
        height: 450px;
        margin-bottom: 5px; 
    }   
    .journal-header-title{
        text-align: center;
        padding: 20px 0 12px 0;       
    }    
    .journal-header-image{
        margin: 0 7px 0 7px;
        border: solid 5px;
        border-color: #cccccc;
        height: 170px;
    }    
    .journal-header-story-left{
        width: 50%;
        float: left;
        border-right: solid;
        height: 210px;
        border-color: #cccccc;
        padding: 10px;
    }
    .journal-header-story-right{
        width: 50%;
        float: right;
        border-left: solid;
        height: 210px;
        border-color: #cccccc;
        padding: 10px;
    }
    .journal-footer{
        display: flex;
        align-items: center;
        min-height: 70px;
        border-radius: 0px 0px 10px 10px;
        background-color: #fafafa;
        border-top: 1px solid #ddd;
   }
</style>