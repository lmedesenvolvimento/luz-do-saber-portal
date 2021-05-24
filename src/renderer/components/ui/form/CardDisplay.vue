<template>
    <div class="card--display" :style="{ 'min-width': minWidth }" :class="{ 'card-sm': isCardSm, ...$attrs.class}">
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
            <slot name="footer"></slot>
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
        },
        minWidth(){
            if(this.$attrs.item)
                return this.$attrs.item.type === 'letra' ? 'inherit' : '100%'
            else
                return '100%'
        }   
    }
}
</script>