<template>
    <div :class="item.type ? item.type : ''">
        <div v-if="isPrimitiveItem">                    
            <ls-item-text
                v-if="template.type === Types.primitive.image"
                :type="type"
                :item="item"
                :template="template"
            ></ls-item-text>

            <ls-item-text
                v-else
                :type="type"
                :item="item"
                :template="template"
            ></ls-item-text>            
        </div>
        <div v-else-if="!isPrimitiveItem" class="item">
            <ls-item-cracha-box
                v-if="template.custom === Types.custom.crachaBox"
                :type="type"
                :item="item"
                :template="template"
            ></ls-item-cracha-box>
        </div>
    </div>  
</template>
<script>
import ItemComponents, { ItemProps } from './index.js'

export default {
    components: { ...ItemComponents },
    mixins: [ ItemProps ],
    computed: {
        isPrimitiveItem(){
            return this.template.custom ? false : true
        }
    }
}
</script>
