<template>
    <div class="card-display" :class="$attrs.class">
        <b-card
            class="card-image-display"
            no-body
        >
            <b-card-body>
                <slot name="img">
                    <async-image class="card-img" src="https://picsum.photos/300/200" />
                </slot>
                <slot></slot>
            </b-card-body>
        </b-card>            
    </div>
</template>
<script>
import AsyncImage from '@ui/AsyncImage'

export default {
    components: {
        AsyncImage
    },
    props: {
        item: Object,
        template: Object
    },    
}
</script>
<style>
</style>
