<template>
    <div class="journal-container">
        <div class="journal">
            <div class="journal-page-container">
                <div v-if="singlePage" class="journal-page">
                    <div class="journal-decoration-1" />
                    <div class="journal-decoration-2" />
                    <div class="journal-content">
                        <div class="journal-header-title">
                            <h2>INSIRA O NOME DO JORNAL</h2>
                        </div>
                        <div class="journal-header-image">
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
        margin-bottom: 5px; 
    } 
    .journal-content{
        background-image: linear-gradient(-90deg,white, #dedede);
        height: 450px;
        margin-bottom: 5px; 
    }   
    .journal-header-title{
        text-align: center;
        padding: 15px 0 15px 0;
    }    
    .journal-header-image{
        margin: 0 10px 0 10px;
        border: solid 5px;
        border-color: #cccccc;
        height: 150px;
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