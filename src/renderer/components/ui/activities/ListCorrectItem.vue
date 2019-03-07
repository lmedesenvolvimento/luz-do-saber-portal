<template>
    <div class="container-fluid">
        <b-row>
            <b-col class="activity-keys" v-if="hasKeys">Keys</b-col>
            <b-col class="activity-values">
                <b-row align-v="center" align-h="center">
                    <b-col :sm="valueColSize" v-for="(item, position) in getItems" v-bind:key="position">                        
                        <ls-item :item="item" :input="input" :template="activity.item_template.value"></ls-item>
                    </b-col>                    
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import { clone } from 'lodash'
import { mapActions } from 'vuex'
import ActitivitiesComponents, { ListMixin } from './index'
export default {
    mixins: [ListMixin],
    components: {
        ...ActitivitiesComponents
    },
    props: ['valueColSize','input'],    
    computed: {
        hasKeys(){
            return this.activity.items.keys.length
        },
        getItems(){
            return this.activity.items.values
        }
    },
    methods: {
        ...mapActions('Activity',['emitSuccess','emitFail'])
    },
    watch: {
        input: {
            handler(input){
                input.value 
                    ? this.emitSuccess() 
                    : this.emitFail()
            },
            deep: true
        }
    }
}
</script>
