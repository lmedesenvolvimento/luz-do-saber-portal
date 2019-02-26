<template>
    <div :class="item.type">
        <div class="item">
            <b-card
                img-top
                no-body
                class="mb-2"
            > 
                <b-card-body>
                    <b-card-img :src="require('@/assets/images/components/examples/cracha-1.png')" />
                </b-card-body>
                <b-card-footer class="big">{{ item.text }}</b-card-footer>                
            </b-card>            
        </div>        
    </div>  
</template>
<script>
export default {
    props: {
        item: Object,
        template: Object
    }
}
</script>
