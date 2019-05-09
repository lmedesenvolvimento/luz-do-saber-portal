<template>
    <div :class="item.type ? item.type : ''">
        <div v-if="isPrimitiveItem">
            <ls-item-text
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
            
            <ls-card-display-validacao
                v-if="template.custom === Types.custom.cardDisplayValidacao"
                :type="type"
                :item="item"
                :template="template"
            ></ls-card-display-validacao>
            <ls-display-18-items
                v-if="template.custom === Types.custom.display18Items"
                :type="type"
                :item="item"
                :template="template"
            ></ls-display-18-items>
            <ls-item-texto-em-blocos
                v-if="template.custom === Types.custom.textoEmBlocos"
                :type="type"
                :item="item"
                :template="template"
            ></ls-item-texto-em-blocos>
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
        },
        
    }
}
</script>
