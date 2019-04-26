<template>
    <div class="container-fluid">
        <b-col v-if="hasKeys" class="activity-keys">
            <b-row align-v="center" align-h="center">
                <b-col v-for="(item, position) in getKeys" :key="position" align-self="center" :sm="valueColSize" class="item" @click="teste(item)"> 
                    <ls-card-draggable 
                        v-if="answer.length"
                        :item="item"
                        @click="console.log('a')"
                    >
                        {{ item.text }}
                    </ls-card-draggable> 
                </b-col>
            </b-row>            
        </b-col> 
        <b-col class="activity-values">
            <b-row align-v="center" align-h="center">
                <b-col v-for="(item, position) in getValues" :key="position" align-self="center" :sm="valueColSize" class="item" @click="checkLetterOrder()"> 
                    <ls-card-droppable                         
                        v-if="answer.length"
                        :item="item"                                               
                    >
                        {{ item.text }}
                    </ls-card-droppable>
                </b-col>                    
            </b-row>
        </b-col>       
        <p>{{ progress }}</p>                
        <!-- <p v-for="(item, position) in getKeys" :key="position">{{ item.id }}</p> -->
        
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import ui from '@/components/ui'
import alerts from '@/components/alerts'
import { MapMixins, ListMixin, CreateAnswersMixins } from './mixins'

export default {
    components: { 
        ...ui,
        ...alerts
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data () {
        return {
            progress: 0
        }
    },
    created(){
        this.setActivityAttrs({ total_correct_items: 7 })
    },
    mounted() {
        this.createAnswersArray()
    },
    methods: {
        teste(a){
            console.log(a)
        },
        ...mapActions('Activity', ['setActivityAttrs'])
    },    
}
</script>
