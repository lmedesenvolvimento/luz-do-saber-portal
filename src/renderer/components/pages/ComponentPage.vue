<template>
    <div class="page-container">        
        <div class="container">
            <b-card>
                <b-card-body v-if="activity">
                    <h1>Formulário</h1>
                    <hr>
                    <h4>Input Text Card</h4>
                    <ls-card-input-text v-for="item in activity.items.values" :key="item.id" class="col-sm" name="base-input" :value="item" :max-length="2" />

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
import { mapState, mapActions } from 'vuex'
import ui from '@/components/ui'
import form from '../ui/form';
import { setTimeout } from 'timers'

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
    },
    computed: {
        ...mapState('Unit', ['unit']),
        ...mapState('Activity', ['activity'])
    },
    mounted(){
        this.getUnit()
        setTimeout(this.getActivity.bind(this), 1000)
    },
    methods: {
        getActivity(){
            try {                
                let params = {
                    module_slug: 'comecar', 
                    theme_slug: 'meu-nome', 
                    unit_slug: 'meu-primeiro-nome', 
                    position: 1
                }

                this.fetchActivity({ 
                    params,
                    question: this.unit.questions[0]
                })

                setTimeout(() => console.log(this.activity), 3000)
            } catch (error) {
                console.warn(error)
            }
        },
        getUnit(){
            let params = {
                module_slug: 'comecar', 
                theme_slug: 'meu-nome', 
                unit_slug: 'meu-primeiro-nome', 
            }

            this.fetchUnit(params)
        },
        ...mapActions('Activity', ['fetchActivity', 'destroyActivity']),
        ...mapActions('Unit', ['fetchUnit'])
    }
}
</script>
