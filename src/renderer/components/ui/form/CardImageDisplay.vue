<template>
    <div class="card--display" :class="$attrs.class">
        <b-card
            :class="imgSize"
            class="card-image-display"
            no-body
        >
            <b-card-body>
                <slot name="img">
                    <async-image class="card-img" color="#999" :src="picture" :alt="imgAlt" />
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
        imgSize(){
            switch(this.template.font_size){
            case 'small':
                return 'img-small'
                break
            case 'medium':
                return 'img-medium'
                break
            default:
                return ''
                break
            }
        },
        picture(){
            return this.item.images.length ? this.item.images[0].url : 'https://picsum.photos/300/200'
        },
        imgAlt(){
            return this.item.text
        }
    }
}
</script>
<style lang="scss">
.img-small{
    width: 58px;
    height: 58px;
}
.img-medium{
    width: 74px;
    height: 74px;
    margin: -8px;
}
</style>
