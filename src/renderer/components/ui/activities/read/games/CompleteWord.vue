<template>
    <div class="container-fluid complete-word">
        <b-col>
            <b-row align-v="center"> 
                <b-col cols="12" md="4" sm="4">
                    <async-image :src="getKeys[0].images[0].url" style="width: 200px"></async-image>
                </b-col>
                <b-col>
                    <b-row>
                        <b-col v-for="(item, position) in letters" :key="position">                            
                            <div v-if="item.id == -1">
                                <ls-card-display>                                       
                                    {{ item.text }}
                                </ls-card-display> 
                            </div>
                            <div v-else>
                                <ls-card-droppable
                                    class="letra texto"
                                    :item="item"
                                    :type="'key'"
                                    :template="activity.item_template.key"
                                    :custom-validate="customValidate"
                                >                                   
                                </ls-card-droppable>
                            </div>                                                      
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <ls-card-display>
                <b-row align-v="center" align-h="center" cols="12" md="12">
                    <b-col v-for="(item, position) in getValues" :key="position" align-self="center" cols="12" :sm="3" :md="3" lg="2" class="item">
                        <Item 
                            :item="item"
                            :type="'value'"
                            :template="activity.item_template.value"
                            :size="activity.item_template.value.font_size"
                        />
                    </b-col>
                </b-row>
            </ls-card-display>
        </b-col>
        <!-- <b-row align-h="center" class="column">
            <b-col v-if="hasKeys" class="activity-keys">
                <b-row align-v="center">
                    <b-col cols="12" md="4" sm="4">
                        <async-image class="image" :src="incompleteWord.images[0].url"></async-image>
                    </b-col>
                    <b-col cols="12" md="8" sm="8" class="pieces-row">
                        <b-row>
                            <b-col v-for="(piece, index) in incompleteWord.pieces" :key="index" :md="1" class="key-pieces item">                                        
                                <div v-if="piece.template.tags === null" :class="[piece.type, 'texto', activity.item_template.key.font_size]">
                                    <ls-card-display
                                        :item="piece"
                                        :valid="piece.valid"
                                        :invalid="piece.invalid"
                                    >
                                        {{ piece.text }}
                                    </ls-card-display>                                    
                                </div>
                                <ls-card-droppable
                                    v-else-if="piece.template.tags === 'encaixar'"
                                    class="letra texto"
                                    :item="piece"
                                    :type="'key'"
                                    :template="activity.item_template.key"
                                >
                                </ls-card-droppable>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-col>
            <b-col v-if="hasKeys" class="activity-keys">
                <b-col class="activity-values" cols="12" md="12">
                    <b-row align-v="center" align-h="center" class="values-container">
                        <ls-card-display v-if="activity.item_template.value.tags==='arrastar'" class="card--display-container">
                            <b-row align-v="center" align-h="center" cols="12" md="12">
                                <b-col v-for="(item, position) in getValues" :key="position" align-self="center" cols="12" :sm="3" :md="3" lg="2" class="item">
                                    <Item 
                                        :item="item"
                                        :type="'value'"
                                        :template="activity.item_template.value"
                                        :size="activity.item_template.value.font_size"
                                    />
                                </b-col>
                            </b-row>
                        </ls-card-display>
                        <b-col v-for="(item, position) in getValues" v-else :key="position" align-self="center" cols="12" :sm="3" :md="3" lg="2" class="item" data-canTrigger="false" @click="triggerFocus(...arguments, item)">
                            <Item 
                                :item="item"
                                :type="'value'"
                                :template="activity.item_template.value"
                                :size="activity.item_template.value.font_size"
                                data-canTrigger="false"
                            />                                
                        </b-col>
                    </b-row>
                </b-col>
            </b-col>
        </b-row> -->
    </div>
</template>
<script>
import { MapMixins, ListMixin, CreateAnswersMixins } from '@ui/activities/mixins'
import ui from '@/components/ui'
import { cloneDeep, findIndex } from 'lodash'
import AsyncImage from '@ui/AsyncImage'
import Item from '@/components/ui/items/Item'
import ItemComponents, { ItemProps } from '@/components/ui/items/index.js'
import { mapState, mapActions } from 'vuex'

import FormProps from '@ui/form'

export default {
    components: {
        ...FormProps,
        AsyncImage
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    props:{ type: String },
    data() {
        return {
            letters: [],
        }
    },
    computed: {
        ...mapState('Activity', ['answers'])
    },
    created(){
        this.createAnswersArray();
        this.getKeys[0].letters.forEach(letter => {
            let id = -1;
            this.getValues.forEach(value => {
                if(value.key_id && (value.text == letter.text)){
                    id = value.id;
                }
            })
            let text = letter.text        
            this.letters.push(Object.assign({}, {text, id}))
        })
    },
    methods: {
        customValidate(transferData, nativeElement, vm){
            this.dataTransfer = transferData
            if (this.dataTransfer.id === vm.item.id){                
                vm.valid = true;
                transferData.valid = true
                vm.setAnswer({
                    type: 'value',
                    data: transferData.id,
                    vm: this
                })
            }else{
                vm.invalid = true;
                transferData.invalid = true
                vm.setAnswer({
                    type: 'value',
                    data: -1,
                    vm: this
                })
            }
        }
    }
}
</script>
<style lang="scss">

</style>
