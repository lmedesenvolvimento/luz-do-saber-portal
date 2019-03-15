<template>
    <div :class="item.type">
        <div class="item" v-if="isPrimitiveItem">
            <ls-item-text
                v-if="template.type === Types.primitive.text"
                :item="item"
                :input="input"
                :hasError="hasError" 
                :hasSuccess="hasSuccess"
            ></ls-item-text>
        </div>
        <div class="item" v-else-if="!isPrimitiveItem">
            <ls-item-cracha-box
                v-if="template.custom === Types.custom.crachaBox"
                :item="item"
                :input="input"
                :hasError="hasError" 
                :hasSuccess="hasSuccess"
            ></ls-item-cracha-box>
        </div>
    </div>  
</template>
<script>
import ItemComponents, { ItemProps } from './index.js'

export default {
    mixins: [ ItemProps ],
    components: { ...ItemComponents },
    created(){
        console.log(this.input)
    },
    computed: {
        isPrimitiveItem(){
            return this.template.custom ? false : true
        }
    },
    watch:{
        input: {
            handler(newVal){
                console.log(newVal)
            },
            deep: true
        }
    }
}
</script>
