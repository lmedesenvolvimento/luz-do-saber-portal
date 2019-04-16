<template>
    <div class="page-container">        
        <div class="container">
            <b-card>
                <b-card-body v-if="activity">
                    <h1>Formulário</h1>
                    <hr>
                    <h4>Input Text Card</h4>
                    <b-row>
                        <b-col
                            v-for="item in activity.items.values" 
                            :key="item.id" 
                            cols="2"
                        >
                            <ls-card-input-text
                                name="base-input" 
                                :value="item" 
                                :max-length="10" 
                                type="value"
                            />
                        </b-col>
                    </b-row>

                    <h4>Selecionar Card</h4>
                    <b-row>
                        <b-col
                            v-for="item in activity.items.values" 
                            :key="item.id" 
                            cols="2"
                        >
                            <ls-card-input 
                                class="col-sm" 
                                label="item.text" 
                                name="card-input"
                                type="value"
                                :item="item"
                            >
                                {{ item.text }}
                            </ls-card-input>                            
                        </b-col>                                  
                    </b-row>                    

                    <b-row>
                        <b-col
                            v-for="item in activity.items.values" 
                            :key="item.id" 
                            :cols="3"
                        >
                            <ls-card-input 
                                label="item.text" 
                                name="card-input"
                                type="value"
                                :item="item"
                            >
                                {{ item.text }}
                                <template slot="img">
                                    <b-card-img src="https://placekitten.com/480/210" alt="Image" bottom />
                                </template>
                            </ls-card-input>                            
                        </b-col>                        
                    </b-row>
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
