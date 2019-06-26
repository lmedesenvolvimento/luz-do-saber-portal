<template>
    <div class="container-fluid">
        <b-row align-v="center" align-h="center">
            <h2>Onde está a bola</h2>         
        </b-row>
        <b-row>
            <b-col class="activity-keys">
                aaaaa
            </b-col>                 
        </b-row>        
    </div>
</template>
<script>
import { MapMixins, ListMixin, CreateAnswersMixins } from '@ui/activities/mixins'
import ui from '@/components/ui'

export default {
    components: { ...ui },    
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data () {
        return {
            
        }
    },
    mounted() {
        this.createAnswersArray()
    },
}
</script>

<style>

</style>
