<template>
    <div class="card--display" :class="$attrs.class">
        <b-card
            class="card-image-display"
            no-body
        >
            <b-card-body>
                <slot name="img">
                    <async-image class="card-img" :src="picture" />
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
    computed: {
        picture(){
            return this.item.images.length ? this.item.images[0].url : 'https://picsum.photos/300/200'
        }
    }
}
</script>
<style>
</style>
