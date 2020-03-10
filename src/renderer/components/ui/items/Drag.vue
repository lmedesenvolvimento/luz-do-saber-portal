<template>
    <div class="drag-wrap" :class="isAbsolute || dragging ? 'isAbsolute' : ''">
        <div
            class="slot drag-el"
            :class="[classlist, hasEmpty && dropped ? 'hidden' : '']"
            :data-transfer="modeledDataTransfer"
            draggable="false"
        >
            <slot />
        </div>
        <div
            v-if="hasEmpty"
            v-show="dragging || dropped"
            class="slot empty-el"
            :class="[classlist, emptyClass]"
            draggable="false"
        >
            <slot v-if="!hasEmptySlot" draggable="false" />
            <slot v-else name="empty-drag" draggable="false" />
        </div>
    </div>
</template>
<script>
if (process.env.BUILD_TARGET !== 'web') {
    window.interact = require('interactjs').default
}

export default {
    props: {
        dataTransfer: {
            type: [Object, String],
            required: true
        },
        dropped: {
            type: Boolean,
            required: false,
            default: false
        },
        emptyClass: {
            type: String,
            required: false,
            default: 'idle'
        },
        classname: {
            type: [String, Array],
            required: false,
            default: 'idle'
        },
        isSigmoid: {
            type: Boolean,
            required: false,
            default: false
        },
        snapOn: {
            type: String,
            required: false,
            default: 'none'
        },
        hasEmpty: {
            type: Boolean,
            required: false,
            default: true
        },
        isAbsolute: {
            type: Boolean,
            required: false,
            default: true
        },
        hasEmptySlot: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data() {
        return {
            initialSnapTarget: {
                targets: [{ x: 0, y: 0, range: Infinity }],
                relativePoints: [{ x: 0, y: 0 }],
                enabled: true,
                endOnly: true,
                offset: 'self'
            },
            draggingElement: {},
            dragging: false,
            sigmoidInterval: '',
            rotation: 0,
            translation: '',
            classlist: this.classname,
            modeledDataTransfer: JSON.stringify(this.dataTransfer)
        }
    },
    watch: {
        snapOn: {
            handler(value) {
                if (value === 'self') this.resetOptionsState()
            }
        }
    },
    mounted() {
        const snap = this.initialSnapTarget
        this.draggingElement = interact(this.$el.firstChild).draggable({
            snap,
            inertia: {
                allowResume: false
            },
            onmove: (event) => this.onMove(event),
            onstart: (event) => this.onStart(event),
            onend: (event) => this.onEnd(event)
        })
        if (this.classlist === 'idle')
            this.classlist = this.$el.parentElement.classList.values()
    },
    methods: {
        onMove(event) {
            if (this.sigmoidInterval !== '') clearInterval(this.sigmoidInterval)
            const target = event.target
            const initialX = parseFloat(target.getAttribute('data-x')) || 0
            const initialY = parseFloat(target.getAttribute('data-y')) || 0
            const newX = initialX + event.dx
            const newY = initialY + event.dy
            this.translation = target.style.transform = `translate(${newX}px, ${newY}px)`

            target.style.transition = '0s'
            this.rotate(event.dx, target, this.translation)
            this.sigmoidInterval = setInterval(
                () => this.rotate(0, target, this.translation),
                1000 / 60
            )

            target.setAttribute('data-x', newX)
            target.setAttribute('data-y', newY)
        },
        onStart(event) {
            const rect = interact.getElementRect(event.target)
            const startX = rect.left + rect.width / 2
            const startY = rect.top + rect.height / 2
            event.target.setAttribute('data-start-x', startX)
            event.target.setAttribute('data-start-y', startY)
            const target = this.$el.parentElement
            target.style['z-index'] = 10001
            target.parentElement.style['z-index'] = 10001
            if (!this.isAbsolute) {
                let container = document.querySelector('.activity-values')
                if (container) container.style.overflow = 'visible'
            }
            this.dragging = true
            this.$emit('onstartEvent', this.dataTransfer)
        },
        onEnd(event) {
            event.dataTransfer = this.dataTransfer
            // event.dataTransfer.snapOn = 'none'
            if (this.sigmoidInterval !== '') clearInterval(this.sigmoidInterval)
            event.target.style.transition = '0.1s'
            event.target.style.transform = this.translation + ' rotate(0deg)'
            const target = this.$el.parentElement
            target.style['z-index'] = 1
            target.parentElement.style['z-index'] = 1
            // if (!this.isAbsolute) {
            //     let container = document.querySelector('.activity-values')
            //     if (container) {
            //         container.style['overflow-x'] = 'hidden'
            //         container.style['overflow-y'] = 'auto'
            //     }
            // }
            // this.dragging = false
            this.$emit('onendEvent', this.dataTransfer, event)
        },
        sigmoid(x) {
            return x / (1 + Math.abs(x))
        },
        rotate(x, target, translation) {
            if (this.isSigmoid) {
                this.rotation = this.rotation * 0.9 + this.sigmoid(x) * 2
                target.style.transform =
                    translation + `rotate(${this.rotation}deg)`
                if (Math.abs(this.rotation) < 0.01) this.rotation = 0
            }
        },
        resetOptionsState() {
            const element = this.draggingElement
            const snapOrigin = {
                targets: [{ x: 0, y: 0, range: Infinity }],
                relativePoints: [{ x: 0, y: 0 }],
                enabled: true,
                endOnly: true,
                offset: 'self'
            }
            element.draggable({ snap: snapOrigin })
            element.draggable({ enabled: true })
            this.$el.firstChild.style.transform = 'translate(0,0)'
            this.$el.firstChild.setAttribute('data-start-x', 0)
            this.$el.firstChild.setAttribute('data-start-y', 0)
            this.$el.firstChild.setAttribute('data-x', 0)
            this.$el.firstChild.setAttribute('data-y', 0)
        }
    }
}
</script>
<style lang="scss" scoped>
[draggable='false'] > * {
    pointer-events: none;
}

.hidden {
    visibility: hidden;
}

.slot {
    z-index: 100;
    touch-action: none;
}

.drag-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    min-width: 20px;
    min-height: 20px;
    &.is-absolute {
        position: absolute;
    }
}

.empty-el {
    position: absolute;
    z-index: 10;
}
</style>
