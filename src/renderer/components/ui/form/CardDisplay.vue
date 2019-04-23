<template>
    <div class="card-display" :class="$attrs.class">
        <label>
            <b-card 
                no-body
            >
                <div class="bgColor" :style="bgColor">
                    <b-card-body>
                        
                        <slot name="img"></slot>
                        <slot :style="bgColor"></slot>
                        
                    </b-card-body>
                </div>
            </b-card>            
        </label>
    </div>
</template>
<script>
export default {
    props: {
        bgColor: String
    }
}
</script>
<style lang="scss">
</style>
