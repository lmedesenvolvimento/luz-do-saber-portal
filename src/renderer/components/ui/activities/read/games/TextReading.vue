<template>
    <div class="container-fluid">        
        <b-row align-h="center" align-v="center">
            <b-col cols="9">
                <b-row>
                    <b-col v-for="(item, position) in getKeys" :key="position" :sm="keyColSize" class="item"> 
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

import ui from '@/components/ui'
import AsyncImage from '@ui/AsyncImage'
import { MapMixins, ListMixin, CreateAnswersMixins } from '@ui/activities/mixins'

export default {
    components: { 
        ...ui
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],    
    mounted() {
        this.createAnswersArray() 
        
    },
}
</script>

<style lang="scss" scoped>

</style>