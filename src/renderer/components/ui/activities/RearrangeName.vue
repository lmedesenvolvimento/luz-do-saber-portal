<template>
    <div class="container-fluid">
        <b-col>
            <b-row align-v="center" align-h="center">
                <b-col v-for="key in activity.items.values"
                       :key="key.id"
                       :sm="colSizes.value"
                >
                    <ls-card-draggable
                        label="item.text" 
                        name="card-input"
                        type="key"
                        :item="key"
                    >
                        {{ key.text }}
                    </ls-card-draggable>
                </b-col>                    
            </b-row>
        </b-col>
        <ls-card-display>
            <b-col v-if="hasKeys">
                <b-row align-v="center" align-h="center">
                    <b-col v-for="item in activity.items.keys" 
                           :key="item.id"
                           :sm="colSizes.key"
                    >
                        <ls-card-droppable
                            label="item.text" 
                            name="card-input"
                            type="value"
                            :item="item"
                        >
                            {{ item.text }}
                        </ls-card-droppable> 
                    </b-col>
                </b-row>            
            </b-col>  
        </ls-card-display>                   
    </div>
</template>

<script>
import { ListMixin, MapMixins, CreateAnswersMixins, createAnswer } from './mixins'
import { sampleSize, drop, range } from 'lodash'

import ui from '@/components/ui'
import alerts from '@/components/alerts'

import { mapState, mapActions } from 'vuex'

export default {
    components: { ...ui, ...alerts },
    mixins: [ListMixin, MapMixins, CreateAnswersMixins],
    props: {
        colSizes: Object
    },
    mounted(){
        this.createAnswersArray()
    }
}
</script>

<style>

</style>
