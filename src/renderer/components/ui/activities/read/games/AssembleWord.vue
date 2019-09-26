<template>
    <div class="container-fluid">        
        <b-row align-h="center" :class="{'column': !horizontal,'reverse': (reverse && horizontal), 'reverse-column': ( reverse && !horizontal )}">
            <b-col v-if="hasKeys" class="activity-keys">
                <b-row>
                    <b-col v-for="(item, position) in correctSyllabblesOrder" :key="position" class="col-sm-3 item">
                        <div class="silaba texto validate-icon-top" :class="activity.item_template.key.font_size">
                            <ls-card-droppable
                                class=""
                                :item="item"
                                :type="'key'"
                                :template="activity.item_template.key"
                                :custom-validate="validateByText"
                            >
                            </ls-card-droppable>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col v-for="(item, position) in getKeys" :key="position" :sm="keyColSize" class="item"> 
                        <async-image :src="item.images.length ? item.images[0].url : ''" :alt="getKeys[0].text" />
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <b-row>
            <b-col
                v-if="hasValues" 
                :class="{ 
                    'flex-4': getValues.length >= 12
                }"
                class="activity-values"
            >
                <b-row>
                    <b-col v-for="(item, position) in getValues" :key="position" align-self="center" :md="valueColSize" :sm="6" class="item"> 
                        <Item 
                            v-if="answers"
                            :item="item"
                            :type="'value'"
                            :template="activity.item_template.value"
                        />
                    </b-col>                    
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import { MapMixins, ListMixin, CreateAnswersMixins } from '@ui/activities/mixins'
import ui from '@/components/ui'
import AsyncImage from '@ui/AsyncImage'
import { mapState, mapActions } from 'vuex'

export default {
    components: {
        ...ui,
        AsyncImage,
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data() {
        return {
            // Este array será populado com objetos contendo as sílabas
            correctSyllabblesOrder: [],
        }
    },
    computed: {        
        ...mapState('Activity', ['answers']),
    },
    created() {
        /**
        * * Percorre o array de sílabas e armazena cada uma em objetos separados
        * * dentro do array correctSyllablesOrder na ordem correta da palavra
        */
        for (let index = 0; index < this.activity.items.keys[0].syllables.length; index++) {
            const element = new Object();
            element.text = this.activity.items.keys[0].syllables[index].text;
            this.correctSyllabblesOrder[index] = element;
        }
        
    },
    mounted() {
        this.createAnswersArray();
    },
    methods: {
        validateByText(transferData, nativeElement, vm) {

            vm.transferData = transferData;
            
            // * Utilizando variáveis auxiliares para melhorar a compreensão do método.
            let draggedObject = transferData;
            let dropZone = vm;

            // Checa se o objeto arrastado possui um ID que corresponde a um dos IDs existentes na resposta
            // e se a sílaba sendo arrastada está na posição correta
            const values_ids = this.getKeys.length ? this.getKeys[0].value_ids : []
            
            if (values_ids.includes(draggedObject.id)
                    && draggedObject.text === dropZone.item.text) {

                dropZone.valid = true
                draggedObject.valid = true
                
                vm.setAnswer({ 
                    type: 'value',
                    data: transferData.id,
                    vm: this
                })
            } else {
                dropZone.invalid = true

                vm.setAnswer({ 
                    type: 'value', 
                    data: -1,
                    vm: this
                })
            }
        },
        ...mapActions('Activity', ['setActivityAttrs', 'setAnswer']),
    }
}
</script>

<style>

</style>