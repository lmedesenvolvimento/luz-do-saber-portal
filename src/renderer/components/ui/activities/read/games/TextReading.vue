<template>
    <div class="container-fluid">        
        <b-row align-h="center" align-v="center">
            <b-col v-for="(item, position) in getKeys" :key="position" :sm="keyColSize" class="item"> 
                <div class="card--text-audio">
                    <div :class="activity.item_template.key.font_size">
                        <ls-card-display>
                            <slot>
                                <b-col>
                                    <b-row>
                                        <b-col cols="7">
                                            <pre>{{ item.text }}</pre>
                                        </b-col>
                                        <b-col>
                                            <async-image :src="item.images.length ? item.images[0].url : null" />
                                        </b-col>
                                    </b-row>                            
                                    <hr>
                                    <ls-card-audio :item="item" class="plyr-flat" />
                                </b-col>                
                            </slot>                        
                        </ls-card-display>
                    </div>                    
                </div>
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
        ...ui,
        AsyncImage    
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    mounted() {
        this.createAnswersArray()
    },
}
</script>

<style>

</style>