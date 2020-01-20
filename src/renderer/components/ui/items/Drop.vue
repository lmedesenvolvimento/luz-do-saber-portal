<template>
    <div class="drop-el">
        <slot />
    </div>
</template>
<script>
// import interact from 'interactjs'
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
        },
        objects: {
            type: [Array, Object],
            required: false
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
        const expected = this.expected
        const check = this.checkdrop
        interact(this.$el).dropzone({
            accept: '.drag-el',
            overlap: 0.25,
            checker(dragEvent, event, dropped) {
                // const dragId = JSON.parse(
                //     draggableElement.getAttribute('data-transfer')
                // )
                // const canDrop = expected.value_ids.includes(dragId.id)
                return dropped && !droppedArr.length > 0
            },
            snap: {
                enabled: false
            },
            ondragenter: (event) => this.ondragenter(event),
            ondragleave: (event) => this.ondragleave(event, snap),
            ondrop: (event) => this.ondrop(event, droppedArr, snap)
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
            event.relatedTarget.classList.remove('can-drop')
            event.draggable.draggable({ snap })
            this.$emit('onhoverEndEvent', event)
        },
        checkdrop(drop, expected) {
            return drop.id === expected.id
        },
        ondrop(event, dropped, snap) {
            event.draggable.draggable({ enabled: false })
            const data = JSON.parse(
                event.relatedTarget.getAttribute('data-transfer')
            )
            if (data.dropped !== undefined && !data.dropped) {
                data.dropped = true
            }
            if (
                this.objects !== undefined &&
                typeof this.objects === 'object' &&
                this.objects.value_ids !== undefined
            ) {
                if (this.objects.id === data.id) dropped.push(this.objects)
            } else if (this.objects !== undefined && this.objects.length) {
                const object = this.objects.find((o) => o.id === data.id)
                if (!object) {
                    dropped.push({ id: undefined, text: undefined })
                } else {
                    dropped.push(object)
                }
            } else {
                dropped.push(data)
            }
            this.$emit('ondropEvent', event, this.expected, dropped)
        }
    }
}
</script>
<style lang="scss"></style>
