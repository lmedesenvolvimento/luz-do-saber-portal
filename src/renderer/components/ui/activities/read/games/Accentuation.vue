<template>
    <div class="container-fluid">        
        <b-row align-h="center">            
            <b-col class="activity-values">
                <ls-card-display style="width: 150px">
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
                </ls-card-display> 
            </b-col>
            <b-col class="activity-keys">
                <b-row>
                    <b-col v-for="(item, position) in getKeys" :key="position" class="item"> 
                        <Item 
                            :item="item"
                            :type="'key'"
                            :template="activity.item_template.key"
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
import alerts from '@/components/alerts'

export default {
    components: {
        ...ui,
        ...alerts
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    mounted() {
        this.createAnswersArray()
    },
}
</script>

<style>

</style>
