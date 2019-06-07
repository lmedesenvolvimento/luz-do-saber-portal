<template>
    <div :class="item.type ? item.type : ''">
        <div v-if="!isPrimitiveItem" class="item">            
            <ls-item-cracha-box
                v-if="template.custom === Types.custom.crachaBox"
                :type="type"
                :item="item"
                :template="template"
            ></ls-item-cracha-box>

            <ls-item-checkmark
                v-if="template.custom === Types.custom.checkmark"
                :type="type"
                :item="item"
                :template="template"
            >
            </ls-item-checkmark>
            
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
            
            <ls-card-audio-listen
                v-if="template.custom === Types.custom.audioPlayer"
                :type="type"
                :item="item"
                :template="template"
            ></ls-card-audio-listen>

            <ls-card-group-droppable
                v-if="template.custom === Types.custom.caixaPalavras"
                label="key.text" 
                name="card-input"
                :item="item"
                :bg-color="item.color"
            >
                {{ item.text }}
            </ls-card-group-droppable>   
        </div>
        <div v-else>
            <ls-item-text 
                v-if="template.type === Types.primitive.text"
                :type="type"
                :item="item"
                :focus="focus"
                :group="group"
                :template="template"
            ></ls-item-text>
            <ls-item-image
                v-else-if="template.type === Types.primitive.image"
                :type="type"
                :item="item"
                :template="template"
            ></ls-item-image>
            <ls-item-audio
                v-else-if="template.type === Types.primitive.audio"
                :type="type"
                :item="item"
                :template="template"
            ></ls-item-audio>
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

