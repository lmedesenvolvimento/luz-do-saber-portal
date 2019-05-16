<template>
    <div class="card-display" :class="$attrs.class">
        <b-card 
            :img-src="image"
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
        valid: Boolean,
        invalid: Boolean,
        image: {
            type: String,
            required: false
        }
    }
}
</script>
<style lang="scss">
</style>
