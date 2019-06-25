<template>
    <div class="card--display" :class="{ 'card-sm': isCardSm, ...$attrs.class}">
        <b-card
            no-body
            :class="{ 'invalid': invalid, 'valid': valid }"
        >
            <fill-background :bg-color="bgColor">
                <b-card-body>
                    <slot name="img"></slot>
                    <slot></slot>
                </b-card-body>
            </fill-background>
        </b-card>
    </div>
</template>
<script>
import FillBackground from '@/components/ui/helpers/FillBackground'

export default {
    components:{
        FillBackground
    },
    props: {
        bgColor: String,
        size: String,
        valid: Boolean,
        invalid: Boolean
    },
    computed: {
        isCardSm(){
            return this.size === 'small'
        }
    }
}
</script>