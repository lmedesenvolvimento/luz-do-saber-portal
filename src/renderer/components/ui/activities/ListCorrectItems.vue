<template>
    <div class="container-fluid">
        <b-row>
            <b-col class="activity-keys" v-if="hasKeys">Keys</b-col>
            <b-col class="activity-values">
                <b-row align-v="center" align-h="center">
                    <b-col :sm="valueColSize" v-for="(item, position) in getItems" v-bind:key="position">                        
                        <Item :item="item" :template="activity.item_template.value"></Item>
                    </b-col>                    
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import Item from '@/components/ui/items/Item'

export default {
    props: {
        activity: Object,
        valueColSize: Number
    },
    components: { Item },
    computed: {
        hasKeys(){
            return this.activity.items.keys.length
        },
        getItems(){
            return this.activity.items.values
        }
    }
}
</script>
