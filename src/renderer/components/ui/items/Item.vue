<template>
    <div v-bind:class="item.type ? item.type : ''">
        <div class="item" v-if="isPrimitiveItem">
            <ls-item-text
                v-if="template.type === Types.primitive.text"
                :type="type"
                :item="item"
            ></ls-item-text>
        </div>
        <div class="item" v-else-if="!isPrimitiveItem">
            <ls-item-cracha-box
                v-if="template.custom === Types.custom.crachaBox"
                :type="type"
                :item="item"
            ></ls-item-cracha-box>
        </div>
    </div>  
</template>
<script>
import ItemComponents, { ItemProps } from './index.js'

export default {
    mixins: [ ItemProps ],
    components: { ...ItemComponents },
    computed: {
        isPrimitiveItem(){
            return this.template.custom ? false : true
        }
    }
}
</script>
