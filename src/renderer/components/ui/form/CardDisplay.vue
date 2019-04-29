<template>
    <div class="card-display" :class="$attrs.class">
        <b-card 
            no-body
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
        bgColor: String
    }
}
</script>
<style lang="scss">
</style>
