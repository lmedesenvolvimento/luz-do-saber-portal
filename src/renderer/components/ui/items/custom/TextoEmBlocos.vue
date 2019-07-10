<template>
    <div class="texto-em-blocos">
        <ls-card-display>
            <div class="text">
                {{ item.text }}
            </div>
        </ls-card-display>
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
            .text{
                padding: 0 1rem;
                letter-spacing: 1.2rem;
                margin-right: -1.2rem !important;
            }
        }
    }
}
</style>
