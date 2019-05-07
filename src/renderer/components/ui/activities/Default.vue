<template>
    <div class="container-fluid">
        <b-row align-h="center" :class="{'column': !horizontal,'reverse': (reverse && horizontal), 'reverse-column': ( reverse && !horizontal )}">
            <b-col v-if="hasKeys">
                <b-row class="activity-keys">
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
            <b-col>
                <b-row class="activity-values" align-v="center" align-h="center">
                    <b-col v-for="(item, position) in getValues" :key="position" align-self="center" :sm="valueColSize" class="item"> 
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
import { MapMixins, ListMixin, CreateAnswersMixins } from './mixins'

export default {
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    mounted() {
        this.createAnswersArray()
    }
}
</script>

<style>

</style>
