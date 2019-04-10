<template>
    <div class="page-container">        
        <div class="container">
            <b-card>
                <b-card-body>
                    <h1>Formulário</h1>
                    <hr>
                    <h4>Selecionar Card</h4>
                    <b-row>
                        <ls-card-input class="col-sm" label="Radio 1" :value="1" name="base-input">
                            Radio 1
                        </ls-card-input>
                        <ls-card-input class="col-sm" label="Radio 2" :value="2" name="base-input">
                            Radio 2
                        </ls-card-input>
                        <ls-card-input class="col-sm" label="Radio 3" :value="3" name="base-input">                            
                            Radio 3
                        </ls-card-input>
                        <ls-card-input class="col-sm" label="Radio 4" :value="4" name="base-input">
                            Radio 4
                        </ls-card-input>
                    </b-row>
                    <p>Resposta: {{ radio1 }}</p>

                    <b-row>
                        <ls-card-input class="col-sm" label="Certo" value="radio1" name="base-input2" variant="success">
                            <b-card-text>Radio 1</b-card-text>
                        </ls-card-input>
                        <ls-card-input class="col-sm" label="Errado" value="radio2" name="base-input2" variant="danger">
                            <b-card-text>Radio 2</b-card-text>
                        </ls-card-input>
                        <ls-card-input class="col-sm" label="Dark" value="radio3" name="base-input2" variant="light">
                            <b-card-text>Radio 3</b-card-text>
                        </ls-card-input>
                        <ls-card-input class="col-sm" label="Primário" value="radio4" name="base-input2" variant="primary">
                            <b-card-text>Radio 4</b-card-text>
                        </ls-card-input>
                    </b-row>
                    <p>Resposta: {{ radio2 }}</p>

                    <b-row>
                        <ls-card-input class="col-sm" label="Radio 1" :value="1" name="base-input">
                            <b-card-text>Radio 1</b-card-text>
                            <template slot="img">
                                <b-card-img src="https://placekitten.com/480/210" alt="Image" bottom />
                            </template>
                        </ls-card-input>
                        <ls-card-input class="col-sm" label="Radio 2" :value="2" name="base-input">
                            <b-card-text>Radio 2</b-card-text>
                            <template slot="img">
                                <b-card-img src="https://placekitten.com/480/210" alt="Image" bottom />
                            </template>
                        </ls-card-input>
                        <ls-card-input class="col-sm" label="Radio 3" :value="3" name="base-input">
                            <b-card-text>Radio 3</b-card-text>
                            <template slot="img">
                                <b-card-img src="https://placekitten.com/480/210" alt="Image" bottom />
                            </template>
                        </ls-card-input>
                        <ls-card-input class="col-sm" label="Radio 4" :value="4" name="base-input">
                            <b-card-text>Radio 4</b-card-text>
                            <template slot="img">
                                <b-card-img src="https://placekitten.com/480/210" alt="Image" bottom />
                            </template>
                        </ls-card-input>
                    </b-row>
                    <p>Resposta: {{ radio3 }}</p>

                    <h4>Selecionar vários Cards</h4>
                    <b-row>
                        <ls-card-select class="col-sm" label="Card 1" :value="1" name="base-input2">
                            <b-card-text>Radio 1</b-card-text>
                        </ls-card-select>
                        <ls-card-select class="col-sm" label="Card 2" :value="2" name="base-input2">
                            <b-card-text>Radio 2</b-card-text>
                        </ls-card-select>
                        <ls-card-select class="col-sm" label="Card 3" :value="3" name="base-input2">
                            <b-card-text>Radio 3</b-card-text>
                        </ls-card-select>
                        <ls-card-select class="col-sm" label="Card 4" :value="4" name="base-input2">
                            <b-card-text>Radio 4</b-card-text>
                            
                        </ls-card-select>
                    </b-row>
                    <p>Resposta: {{ select1 }}</p>
                    <b-row>
                        <ls-card-select class="col-sm" label="Card 1" :value="1" name="base-input3">
                            <b-card-text>Radio 1</b-card-text>
                            <template slot="img">
                                <b-card-img src="https://placekitten.com/480/210" alt="Image" bottom />
                            </template>
                        </ls-card-select>
                        <ls-card-select class="col-sm" label="Card 2" :value="2" name="base-input3">
                            <b-card-text>Radio 2</b-card-text>
                            <template slot="img">
                                <b-card-img src="https://placekitten.com/480/210" alt="Image" bottom />
                            </template>
                        </ls-card-select>
                        <ls-card-select class="col-sm" label="Card 3" :value="3" name="base-input3">
                            <b-card-text>Radio 3</b-card-text>
                            <template slot="img">
                                <b-card-img src="https://placekitten.com/480/210" alt="Image" bottom />
                            </template>
                        </ls-card-select>
                        <ls-card-select class="col-sm" label="Card 4" :value="4" name="base-input3">
                            <b-card-text>Radio 4</b-card-text>
                            <template slot="img">
                                <b-card-img src="https://placekitten.com/480/210" alt="Image" bottom />
                            </template>
                        </ls-card-select>
                    </b-row>
                    <p>Resposta: {{ select2 }}</p>
                    <hr>
                    <router-link to="/">
                        Voltar
                    </router-link>
                </b-card-body>
            </b-card>
        </div>
    </div>
</template>
<script>
import ui from '@/components/ui'

export default {
    components: { ...ui },
    data(){
        return{
            radio1: null,
            radio2: null,
            radio3: null,
            select1: [],
            select2: []
        }
    }
}
</script>
