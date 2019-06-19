<template>
    <div class="container-fluid">
        <b-row>
            <b-col v-if="hasKeys" class="activity-keys">
                <b-row>
                    <b-col v-for="(item, position) in getKeys" :key="position" :sm="keyColSize" class="item"> 
                        <Item 
                            v-if="answers"
                            :item="item"
                            :type="'key'"
                            :template="activity.item_template.key"
                        />
                        <ls-card-audio-listen
                            :item="item"
                        >
                            Ronaldo
                        </ls-card-audio-listen>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <b-row>
            <b-col 
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
import { ListMixin, MapMixins, CreateAnswersMixins, createAnswer } from '@ui/activities/mixins'
import ItemComponents from '@ui/form/index.js'

export default {
    components: {
        ...ItemComponents,
    },
    mixins: [ListMixin, MapMixins, CreateAnswersMixins],
    mounted() {
        console.log(this.item);
    }
}
</script>