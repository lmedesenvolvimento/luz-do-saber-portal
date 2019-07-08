<template>
    <div class="texto-em-blocos">
        <ls-card-display>{{ item.text }}</ls-card-display>
    </div>
</template>
<script>
import { ItemProps } from '../index.js'
export default {
    mixins: [ItemProps]
}
</script>
<style lang="scss">
.texto-em-blocos {
    .card--display {
        width: auto !important;
        .card-body {
            padding-left: 2rem;
            letter-spacing: 1rem;
        }
    }
}
</style>
