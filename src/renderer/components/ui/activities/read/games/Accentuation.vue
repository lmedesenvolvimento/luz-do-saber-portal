<template>
    <div class="container-fluid">
        <b-row align-h="center">
            <b-col class="activity-values">
                <ls-card-display style="width: 150px">
                    <b-row v-for="(item, position) in getValues" :key="position" align-self="center" :md="valueColSize" :sm="6" class="item"> 
                        <b-col class="accentuation-item">
                            <Item 
                                v-if="answers"
                                :item="item"
                                :type="'value'"
                                :template="activity.item_template.value"
                            />
                        </b-col>                 
                    </b-row> 
                </ls-card-display> 
            </b-col>
            <b-col class="activity-keys">
                <div>
                    <b-row v-for="(item, position) in getKeys" :key="position" align-self="center" :md="keyColSize" :sm="6" class="item"> 
                        <b-col class="drop item accentuation-item accentuation-drop" md="1">
                            <div :class="activity.item_template.key.font_size">
                                <ls-card-droppable
                                    class="letra texto"
                                    :item="item"
                                    :type="'key'"
                                    :template="activity.item_template.key"
                                    :custom-validate="customValidate"
                                >
                                    <template slot="transfer-data">
                                        {{ symbols[position].correct ? symbols[position].text : dataTransfer.text }}
                                    </template>
                                </ls-card-droppable>                                                               
                            </div>                            
                        </b-col>
                        <b-col class="name-container">
                            <div class="accentuation-word">
                                <ls-card-display class="name">
                                    {{ symbols[position].correct ? item.text : normalizeWord(item.text) }}
                                </ls-card-display>
                            </div>
                        </b-col>    
                    </b-row>
                </div>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import { MapMixins, ListMixin, CreateAnswersMixins } from '@ui/activities/mixins'
import ui from '@/components/ui'
import alerts from '@/components/alerts'

export default {
    components: {
        ...ui,
        ...alerts
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data () {
        return {
            symbols: [],
            dataTransfer: {text: '~'}
        }
    },
    created () {
        this.getKeys.forEach(key => {
            this.getValues.forEach(value => {
                if(key.id === value.key_id) {
                    this.symbols.push({text: value.text});
                    this.symbols[this.symbols.length-1].correct = false
                }                
            });
        });
    },
    mounted() {
        this.createAnswersArray();
    },
    methods: {
        normalizeWord (word) {
            return word.split('').map(function (letter) {
                let i = this.accents.indexOf(letter)
                return (i !== -1) ? this.out[i] : letter
            }.bind({
                accents: 'ÀÁÂÃÄÅĄàáâãäåąßÒÓÔÕÕÖØÓòóôõöøóÈÉÊËĘèéêëęðÇĆçćÐÌÍÎÏìíîïÙÚÛÜùúûüÑŃñńŠŚšśŸÿýŽŻŹžżź',
                out: 'AAAAAAAaaaaaaaBOOOOOOOOoooooooEEEEEeeeeeeCCccDIIIIiiiiUUUUuuuuNNnnSSssYyyZZZzzz'
            })
            ).join('')
        },
        customValidate(transferData, nativeElement, vm){
            this.dataTransfer = transferData
            if (this.dataTransfer.id === vm.item.value_ids[0]){
                this.symbols.forEach(e => {
                    if (e.text === this.dataTransfer.text){
                        e.correct = true
                    }
                });
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
    .accentuation-item {
        margin: 5px 0 5px 0;
    } 

    .accentuation-drop {
        .card--droppable{
            .card{
                z-index: 1;
            }
        }
    }

    .accentuation-word {
        margin: 5px 0 0 -35px; 
        z-index: 0;
    }    
</style>
