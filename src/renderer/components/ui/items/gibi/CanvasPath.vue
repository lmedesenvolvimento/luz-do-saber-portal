<template>
    <v-layer ref="layer">
        <v-group 
            v-if="data.variant === 'balloon'" 
            ref="group"
            :config="{ 
                name: data.name, 
                x: data.x,
                y: data.y,
                scaleX: data.scaleX, 
                scaleY: data.scaleY,
                draggable: true 
            }"
            @dragend="handleTransformEnd"
        >
            <v-image 
                :config="{
                    image: data.image,
                    width: data.width,
                    height: data.height,
                }"
            ></v-image>
            <v-text 
                ref="text" 
                :config="{
                    width: data.width,
                    height: data.height,
                    fontSize: data.fontSize,
                    align: 'center',
                    verticalAlign: 'middle',                
                    padding: data.padding,
                    wrap: 'word',
                    text: data.text
                }"
                @dblclick="handleDoubleTap"
            ></v-text>      
        </v-group>
        <v-image 
            v-else 
            :config="data"
            @dragend="handleTransformEnd"
        />
        <v-transformer ref="transformer" @transform="handleTransformEnd" />
    </v-layer>
</template>

<script>
import { mapState } from 'vuex'

export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    computed: mapState({
        selectedShape: ({ Gibi }) => Gibi.selectedShape
    }),
    watch: {
        selectedShape(newVal, oldVal) {
            if (newVal !== oldVal) {
                newVal === this.data.name
                    ? this.updateTransformer()
                    : this.removeTransformer()
            }
        }
    },
    mounted() {
        if (this.data.type === 'image') {
            const image = new Image()                        
            
            image.src = this.data._src
            image.onload = () => {
                this.data.image = image                
            }
        }
    },
    destroyed() {
        this.removeTransformer()
    },
    methods: {
        createTextarea() {
            // Clear Selection
            this.removeTransformer()

            const groupNode = this.$refs.group.getNode()
            const textNode = this.$refs.text.getNode()
            const textPosition = textNode.getAbsolutePosition()

            const areaPosition = {
                x: textPosition.x,
                y: textPosition.y,
            }
            const absTextNodeScale = textNode.getAbsoluteScale()
            
            const textarea = document.createElement('textarea')

            document.body.appendChild(textarea)

            textarea.value = textNode.text()
            textarea.style.position = 'absolute'
            textarea.style.top = areaPosition.y + 'px'
            textarea.style.left = areaPosition.x + 'px'
            textarea.style.fontSize = textNode.fontSize() * absTextNodeScale.x + 'px'
            textarea.style.width = textNode.width() * groupNode.scaleX() + 'px'
            textarea.style.height = textNode.height() * groupNode.scaleY() + 'px'
            textarea.style.verticalAlign = 'middle'

            textarea.focus()

            textarea.addEventListener('blur', ({ target }) => {
                this.data.text = target.value
                document.body.removeChild(textarea)
            })
        },
        handleTransformEnd(e) {
            if (e.currentTarget.nodeType === 'Group'){
                const groupNode = this.$refs.group && this.$refs.group.getNode()
                if (groupNode) {
                    this.data.x = groupNode.x()
                    this.data.y = groupNode.y()
                    this.data.rotation = groupNode.rotation()
                    this.data.scaleX = groupNode.scaleX()
                    this.data.scaleY = groupNode.scaleY()
                }
            } else {
                // sincronizando mudanças
                this.data.x = e.target.x()
                this.data.y = e.target.y()
                this.data.rotation = e.target.rotation()
                this.data.scaleX = e.target.scaleX()
                this.data.scaleY = e.target.scaleY()
            }
        },
        handleDoubleTap() {
            if (this.data.variant === 'balloon') {
                this.createTextarea()
            }
        },
        updateTransformer() {
            // ativando transformer
            const transformer = this.$refs.transformer
            const transformerNode = transformer.getNode()
            const stage = transformerNode.getStage()
            const { selectedShape } = this

            const selectedNode = stage.findOne('.' + selectedShape)

            if (selectedNode === transformerNode.node()) {
                return
            }

            if (selectedNode) {
                // adicionado ao transformer layer
                transformerNode.nodes([selectedNode])
            } else {
                this.removeTransformer()
            }

            // aplicando no canvas transformer
            transformerNode.getLayer().batchDraw()
            
        },
        removeTransformer() {
            const transformer = this.$refs.transformer

            if (!transformer) {
                return
            }

            const transformerNode = transformer.getNode()

            transformerNode.nodes([])
            transformerNode.getLayer().batchDraw()
        },
    },
}
</script>

<style>

</style>