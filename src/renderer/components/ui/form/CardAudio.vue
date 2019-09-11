<template>
    <div v-if="item" class="card--audio" :class="$attrs.class">
        <b-card
            no-body
        >
            <vue-plyr v-if="uri" ref="plyr" :options="playerOptions">
                <audio>
                    <source :src="uri" type="audio/mp3" />
                </audio>
            </vue-plyr>
        </b-card>
    </div>
</template>

<script>
import RadioInput from './RadioInput.vue'
import CardAudioListenWithPlayer from './CardAudioListenWithPlayer'

export default {
    mixins: [RadioInput, CardAudioListenWithPlayer],
}
</script>

