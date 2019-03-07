<template>
    <div :class="item.type">
        <div class="item">
            <ls-card-input class="col-sm" v-model="input.value" label="item.text" :value="item.is_correct" name="base-input">
                <b-card-text>{{ item.text }}</b-card-text>
                <template slot="img">
                    <b-card-img :src="require('@/assets/images/components/examples/cracha-1.png')" />
                </template>
            </ls-card-input>
        </div>        
    </div>  
</template>
<script>
import { mapState } from 'vuex'
import FormInputs from '@/components/ui/form'

export default {
    props: {
        item: Object,
        input:  Object,
        template: Object
    },
    components: {
        ...FormInputs
    }
}
</script>
