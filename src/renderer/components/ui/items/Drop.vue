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
            required: false
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
        },
        maxItems: {
            type: [Number, String],
            required: false,
            default: 1
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
            dropzoneSnap: this.snap || { x: 0, y: 0 },
            canDrop: false
        }
    },
    mounted() {
        const snap = this.initialSnapTarget
        const droppedArr = this.dropped
        const maxItems = Number(this.maxItems)
        const expected = this.expected
        interact(this.$el).dropzone({
            accept: '.drag-el',
            overlap: 'center',
            checker(dragEvent, event, dropped) {
                // if (dropped) {
                //     console.log('canDrop')
                // } else {
                //     console.log('not dropped')
                // }
                return dropped && droppedArr.length < maxItems
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

            this.canDrop = true
            this.$emit('onhoverEvent', event)
        },
        ondragleave(event, snap) {
            this.canDrop = false
            event.relatedTarget.classList.remove('can-drop')
            event.draggable.draggable({ snap })
            this.$emit('onhoverEndEvent', event)
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
