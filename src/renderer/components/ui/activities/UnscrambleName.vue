<template>
    <div class="container-fluid">
        <b-col>
            <b-row align-v="center" align-h="center">
                <b-col v-for="item in activity.items.values"
                       :key="item.id"
                >
                    <ls-card-draggable
                        label="item.text" 
                        name="card-input"
                        :item="item"
                    >
                        {{ item.text }}
                    </ls-card-draggable>
                </b-col>                    
            </b-row>
        </b-col>
        <ls-card-display>
            <b-col v-if="hasKeys">
                <b-row align-v="center" align-h="center">
                    <b-col v-for="key in activity.items.keys" 
                           :key="key.id"
                    >
                        <ls-card-droppable
                            label="key.text" 
                            name="card-input"
                            :item="key"
                        >
                        </ls-card-droppable> 
                    </b-col>
                </b-row>            
            </b-col>  
        </ls-card-display>                   
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import ui from '@/components/ui'
import alerts from '@/components/alerts'
import { sortBy, shuffle } from 'lodash'
import { MapMixins, ListMixin, CreateAnswersMixins } from './mixins'

export default {
    components: { 
        ...ui,
        ...alerts
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data () {
        return {
            
        }
    },
    created(){
        this.setActivityAttrs({ total_correct_items: this.getKeys.length })
    },
    mounted() {
        this.createAnswersArray()
    },
    methods: {        
        ...mapActions('Activity', ['setActivityAttrs'])
    },    
}
</script>
