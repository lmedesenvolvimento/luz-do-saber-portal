<template>
    <div :class="[item.type, template.type, fontSize]">
        <div v-if="!isPrimitiveItem" class="item">
            <ls-item-cracha-box
                v-if="template.custom === Types.custom.crachaBox"
                :type="type"
                :item="item"
                :template="template"
            ></ls-item-cracha-box>

            <ls-item-checkmark
                v-else-if="template.custom === Types.custom.checkmark"
                :type="type"
                :item="item"
                :template="template"
            >
            </ls-item-checkmark>

            <ls-card-display-validacao
                v-else-if="template.custom === Types.custom.cardDisplayValidacao"
                :type="type"
                :item="item"
                :template="template"
            ></ls-card-display-validacao>

            <ls-display-18-items
                v-else-if="template.custom === Types.custom.display18Items"
                :type="type"
                :item="item"
                :template="template"
            ></ls-display-18-items>

            <ls-item-texto-em-blocos
                v-else-if="template.custom === Types.custom.textoEmBlocos"
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
                v-else-if="((template.custom === Types.custom.caixaPalavras) || (template.custom === Types.custom.grupoPalavras))"
                label="key.text"
                name="card-input"
                :item="item"
                :bg-color="item.color"
                :template="template"
            >                
                {{ item.text }}
            </ls-card-group-droppable>

            <ls-card-image-display
                v-else-if="template.custom === Types.custom.descricaoImagem"
                label="item.text"
                :item="item"
                :name="activity.type.slug"
                :template="template"
            >
            </ls-card-image-display>
        </div>
        <items-primitive
            v-else
            :type="type"
            :item="item"
            :size="size"
            :focus="focus"
            :group="group"
            :template="template"
        />
    </div>
</template>
<script>
import ItemComponents, { ItemProps } from './index.js'
import ItemsPrimitive from './Primitive'
export default {
    components: { ItemsPrimitive, ...ItemComponents },
    mixins: [ ItemProps ],
    computed: {
        isPrimitiveItem(){
            return this.template.custom ? false : true
        },
        getItemClass() {
            return `${this.item ? this.item.type : ''} ${ this.template ? this.template.type : '' }`
        },
        fontSize() {
            console.log(this.size)
            if (this.size) {
                return this.size
            }
            return this.template.font_size ? this.template.font_size : ''
        }
    }
}
</script>

