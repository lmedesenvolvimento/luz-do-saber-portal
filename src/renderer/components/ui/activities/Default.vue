<template>
    <div class="container-fluid">
        <b-row align-h="center" :class="{'column': !horizontal,'reverse': (reverse && horizontal), 'reverse-column': ( reverse && !horizontal )}">
            <b-col v-if="hasKeys" class="activity-keys">
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
                :class="{ 
                    'flex-4': getValues.length >= 12 
                }"
                class="activity-values" 
            >
                <b-row align-v="center" align-h="center">
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
import { MapMixins, ListMixin, CreateAnswersMixins } from '@ui/activities/mixins'

export default {
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    mounted() {
        this.createAnswersArray()
    }
}
</script>

<style>

</style>
