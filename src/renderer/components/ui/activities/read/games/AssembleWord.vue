<template>
    <div class="container-fluid">        
        <b-row align-h="center" :class="{'column': !horizontal,'reverse': (reverse && horizontal), 'reverse-column': ( reverse && !horizontal )}">
            <b-col v-if="hasKeys" class="activity-keys">
                <b-row>
                    <b-col v-for="(item, position) in correctSyllabblesOrder" :key="position" class="col-sm-3">
                        <div class="silaba texto validate-icon-top" :class="activity.item_template.key.font_size">
                            <ls-card-droppable
                                class=""
                                :item="item"
                                :type="'key'"
                                :template="activity.item_template.key"
                            >
                            </ls-card-droppable>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col v-for="(item, position) in getKeys" :key="position" :sm="keyColSize" class="item"> 
                        <Item 
                            v-if="answers"
                            :item="item"
                            :type="'key'"
                            :template="activity.item_template.key"
                        />
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
                    <b-col v-for="(item, position) in Shuffle_Array(getValues)" :key="position" align-self="center" :md="valueColSize" :sm="6" class="item"> 
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

export default {
    components: {
        ...ui,
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data() {
        return {
            // Este array será populado com objetos contendo as sílabas
            correctSyllabblesOrder: [],
        }
    },
    created() {
        this.createAnswersArray();

        /**
        * * Percorre o array de sílabas e armazena cada uma em objetos separados
        * * dentro do array correctSyllablesOrder na ordem correta da palavra
        */
        for (let index = 0; index < this.activity.items.values.length; index++) {
            const element = new Object();
            element.text = this.activity.items.values[index].text
            this.correctSyllabblesOrder[index] = element;
        }
    },
    methods: {
        // Método para embaralhar as sílabas da palavra
        Shuffle_Array(arrayToShuffle) {
            let counter = arrayToShuffle.length;
            let temp;

            // Enquanto existe elemento
            while (counter > 0) {
                // gerador de índice aleatório
                let index = Math.floor(Math.random() * counter);

                // Decresce o contador e substitui o último elemento por ele
                counter--;
                temp = arrayToShuffle[counter];
                arrayToShuffle[counter] = arrayToShuffle[index];
                arrayToShuffle[index] = temp;
            }
            
            // Retorna o novo array embaralhado
            let shuffledArray = new Array();
            shuffledArray = arrayToShuffle;
            return shuffledArray;
        }
    }
}
</script>

<style>

</style>
