<template>
    <div>
        <ls-card-draggable
            class="letters"
            v-if="type === 'value'"
            label="item.text" 
            name="card-input"
            type="key"
            :item="item"
            :bg-color="item.color"
        >
            {{ item.text }}
        </ls-card-draggable>
        <div v-if="type==='key'">
            <ls-card-droppable
                class="names"
                v-if="type === 'key'"
                label="item.text" 
                name="card-input"
                type="value"
                :item="item"
                :bg-color="item.color"
            >
                {{ item['first_letter'] }}
            </ls-card-droppable>
        </div>
    </div>
</template>

<script>
import { ItemProps } from '../index.js'
export default {
    mixins: [ItemProps],
    created(){
        console.log(this.item.text)
    }
}
</script>

<style lang="scss">
    .names{
        width: 80px;
    }
    .letters{
        width: 80px;
        }
        .card-input.draggshadow{
            width: 80px;
    }
</style>
