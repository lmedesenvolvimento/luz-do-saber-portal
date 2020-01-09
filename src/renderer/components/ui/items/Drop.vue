<template>
    <div class="drop-el">
        <slot />
    </div>
</template>
<script>
import interact from 'interactjs'
export default {
    props: {
        expected: {
            type: [String, Object],
            required: true
        },
        snap: {
            type: Object,
            required: false,
            default() {
                return undefined
            }
        }
    },
    data() {
        return {
            dropped: [],
            initialSnapTarget: {
                targets: [{ x: 0, y: 0, range: Infinity }],
                relativePoints: [
                    { x: 0, y: 0 } // snap relative to the element's top-left,
                ],
                enabled: true,
                endOnly: true,
                offset: 'self'
            },
            dropzoneSnap: this.snap || { x: 0, y: 0 }
        }
    },
    mounted() {
        const snap = this.initialSnapTarget
        const droppedArr = this.dropped
        interact(this.$el).dropzone({
            accept: '.drag-el',
            overlap: 0.25,
            checker(dragEvent, event, dropped) {
                return dropped && !droppedArr.length > 0
            },
            snap: {
                enabled: false
            },
            ondropactivate: (event) => this.ondropactivate(event),
            ondragenter: (event) => this.ondragenter(event),
            ondragleave: (event) => this.ondragleave(event, snap),
            ondrop: (event) => this.ondrop(event, droppedArr, snap),
            ondropdeactivate: (event) => this.ondropdeactivate(event)
        })
    },
    methods: {
        ondropactivate(event) {
            event.target.classList.add('drop-active')
        },
        ondragenter(event) {
            const draggableElement = event.relatedTarget
            const startPosX =
                parseFloat(draggableElement.getAttribute('data-start-x')) || 0
            const startPosY =
                parseFloat(draggableElement.getAttribute('data-start-y')) || 0
            const dropRect = interact.getElementRect(event.target)
            const dropCenter = {
                x:
                    dropRect.left -
                    startPosX +
                    this.dropzoneSnap.x +
                    dropRect.width / 2,
                y:
                    dropRect.top -
                    startPosY +
                    this.dropzoneSnap.y +
                    dropRect.height / 2,
                range: Infinity
            }
            event.draggable.draggable({
                snap: {
                    targets: [dropCenter],
                    relativePoints: [{ x: 0, y: 0 }],
                    enabled: true,
                    endOnly: true
                }
            })
            event.target.classList.add('drop-target')
            event.relatedTarget.classList.add('can-drop')
            this.$emit('onhoverEvent', event)
        },
        ondragleave(event, snap) {
            // event.target.classList.remove('drop-target')
            event.relatedTarget.classList.remove('can-drop')
            event.draggable.draggable({ snap })
            this.$emit('onhoverEndEvent', event)
        },
        ondrop(event, dropped, snap) {
            event.draggable.draggable({ enabled: false })
            const data = JSON.parse(
                event.relatedTarget.getAttribute('data-transfer')
            )
            dropped.push(data)
            if (data.dropped !== undefined && !data.dropped) {
                data.dropped = true
            }
            this.$emit('ondropEvent', event, this.expected, dropped)
        },
        ondropdeactivate(event) {
            // event.target.classList.remove('drop-active')
            // event.target.classList.remove('drop-target')
        }
    }
}
</script>
<style lang="scss"></style>
