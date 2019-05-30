<template>
    <div>
        <!-- <ls-card-input-text
            v-if="isInput"
            name="base-input" 
            :value="item"
            type="value"
            :bg-color="item.color"
        /> -->

        <!-- <ls-card-input-image
            v-else-if="isInput"
            name="base-input" 
            :value="item"
            type="value"
            :bg-color="item.color"
        /> -->

        <!-- <ls-card-draggable
            v-else-if="isDrag"
            label="item.text" 
            :item="item"
            :name="activity.type.slug"
            :bg-color="item.color"
        >
            {{ item.text }}
        </ls-card-draggable>

        <ls-card-droppable
            v-else-if="isDrop"
            label="key.text" 
            name="card-input"
            :item="item"
            :bg-color="item.color"
        >
            {{ item.text }}
        </ls-card-droppable>        

        <ls-card-input 
            v-else-if="type === 'key' && isJoinInput"
            class="col-sm" 
            label="item.text" 
            :item="item"
            :type="type"
            :name="activity.type.slug"
            :bg-color="item.color"
        >
            {{ item.text }}
        </ls-card-input> -->

        <ls-card-display 
            v-if="type === 'key'"
            class="col-sm" 
            label="item.text" 
            :item="item"
            :image="'https://picsum.photos/300/200'"
            :name="activity.type.slug"
            :bg-color="item.color"
        >
            <template v-slot:img>
                <b-card-img src="https://picsum.photos/300/200">
                </b-card-img>
            </template>
        </ls-card-display>

        <ls-card-input 
            v-else-if="type === 'value'"
            label="item.text" 
            :type="type"
            :item="item"
            :name="activity.type.slug"
            :bg-color="item.color"
        >
            {{ item.text }}
        </ls-card-input>
    </div>
</template>
<script>
import { ItemProps } from './index.js'
export default {
    mixins: [ItemProps],
    mounted() {
        // console.log(this.item.images[0].url)
    }
}
</script>
