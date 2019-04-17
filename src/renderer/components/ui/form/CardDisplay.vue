<template>
    <div class="card-display" :class="$attrs.class">
        <label>
            <b-card 
                no-body
            >
                <b-card-body>
                    <slot name="img"></slot>
                    <slot></slot>
                </b-card-body>
            </b-card>            
        </label>
    </div>
</template>
<script>
export default {}
</script>
<style lang="scss">    
</style>
