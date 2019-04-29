<template>
    <div class="container-fluid">
        <b-col>
            <b-row align-v="center" align-h="center">
                <b-col v-for="item in activity.items.values"
                       :key="item.id"
                >
                    <Item
                        :item="item"
                        :type="'value'"
                        :template="activity.item_template.value"
                    >                        
                    </Item>
                </b-col>                    
            </b-row>
        </b-col>
        <ls-card-display>
            <b-col v-if="hasKeys">
                <b-row align-v="center" align-h="center">
                    <b-col v-for="key in activity.items.keys" 
                           :key="key.id"
                    >
                        <Item
                            :item="key"
                            :type="'key'"
                            :template="activity.item_template.key"
                        >                        
                        </Item>
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
