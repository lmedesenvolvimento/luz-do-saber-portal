<template>
    <div class="container-fluid">        
        <b-row align-h="center" :class="{'column': !horizontal,'reverse': (reverse && horizontal), 'reverse-column': ( reverse && !horizontal )}">
            <b-col 
                v-if="hasKeys" 
                class="activity-keys align-items-center"
                :class="{'flex-2': !horizontal}"
            >
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
            <b-col 
                class="activity-values align-items-end"
            >
                <b-row align-v="end" align-h="end" class="fill">
                    <b-col v-for="(item, position) in getValues" :key="position" align-self="end" :md="valueColSize" :sm="6" class="item"> 
                        <Item 
                            v-if="answers"
                            :item="item"
                            :type="'value'"
                            :size="'small'"
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

export default {
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    inheritAttrs: false,
    props: {
        keyExtraClass: String,
        valueExtraClass: String,
    },
    mounted() {
        this.createAnswersArray()
    },
}
</script>

<style>

</style>
