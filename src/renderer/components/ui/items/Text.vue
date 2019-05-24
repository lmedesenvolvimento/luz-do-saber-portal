<template>
    <div>
        <ls-card-input-text
            v-if="isInput"
            name="base-input" 
            :value="item"
            :focus="focus"
            type="value"
            :bg-color="item.color"
        />

        <!-- <ls-card-input-image
            v-else-if="isInput"
            name="base-input" 
            :value="item"
            type="value"
            :bg-color="item.color"
        /> -->

        <ls-card-draggable
            v-else-if="isDrag"
            label="item.text" 
            :item="item"
            :name="activity.type.slug"
            :bg-color="item.color"
        >
            {{ item.text }}
        </ls-card-draggable>

        <ls-card-droppable
            v-else-if="isDrop && !group"
            label="key.text" 
            name="card-input"
            :item="item"
            :bg-color="item.color"
        >
            {{ item.text }}
        </ls-card-droppable>  

        <ls-card-group-droppable
            v-else-if="isDrop && group"
            label="key.text" 
            name="card-input"
            :item="item"
            :bg-color="item.color"
        >
            {{ item.text }}
        </ls-card-group-droppable>        

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
        </ls-card-input>

        <ls-card-display 
            v-else-if="type === 'key'"
            class="col-sm" 
            label="item.text" 
            :item="item"
            :name="activity.type.slug"
            :bg-color="item.color"
        >
            {{ item.text }}
        </ls-card-display>

        <div
            v-else-if="type === 'value'"
            class="special-display"
        >
            <ls-checkmark
                :type="type"
                :item="item"
                :name="activity.type.slug"
                :bg-color="item.color"
            >
            </ls-checkmark>

            <ls-card-input 
                class="limited-width-input"
                label="item.text" 
                :type="type"
                :item="item"
                :name="activity.type.slug"
                :bg-color="item.color"
            >
                {{ item.text }}
            </ls-card-input>
        </div>

        <!-- <ls-card-input 
            v-else-if="type === 'value'"
            label="item.text" 
            :type="type"
            :item="item"
            :name="activity.type.slug"
            :bg-color="item.color"
        >
            {{ item.text }}
        </ls-card-input> -->

        <!--
            Coloquei os inputs que pertencem aos checkmarks dentro de uma <div>.
            Fiz isso para ter mais controle sobre o alinhamento dos elementos.
        -->
    </div>
</template>
<script>
import { ItemProps } from './index.js'
export default {
    mixins: [ItemProps],
}
</script>
<style lang="scss">
    // Precisei adicionar essa classe à <div> que possui os checkmarks para poder alinhar corretamente
    .special-display {
        display: flex;
        justify-content: space-between;

        .limited-width-input {
            min-width: 350px;
        }
    }
</style>
