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
        width: 100% !important;
        .card-body {
            padding-left: 2.4rem !important;
            letter-spacing: 1.2rem;
        }
    }
}
</style>
