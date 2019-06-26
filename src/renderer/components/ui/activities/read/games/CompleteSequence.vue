<template>
    <div class="container-fluid">
        <b-row align-v="center" align-h="center">
            <h2>{{ getKeys[0].text }}</h2>
        </b-row>
        <b-row>
            <b-col class="activity-keys">
                <ls-card-display>
                    <b-row>
                        <div 
                            v-for="item in activity.items.values"
                            :key="item.id"
                            class="item"
                        >
                            <Item
                                :item="item"
                                :type="'value'"
                                :template="activity.item_template.value"
                            >                        
                            </Item>
                        </div>
                    </b-row>
                </ls-card-display>                
            </b-col>                
        </b-row>        
    </div>
</template>
<script>
import { MapMixins, ListMixin, CreateAnswersMixins } from '@ui/activities/mixins'
import ui from '@/components/ui'

export default {
    components: { ...ui },    
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data () {
        return {
            
        }
    },
    mounted() {
        this.createAnswersArray()
    },
}
</script>

<style>

</style>
