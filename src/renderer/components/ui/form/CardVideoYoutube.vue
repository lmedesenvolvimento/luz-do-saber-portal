<template>
    <div v-if="item" class="card--youtube" :class="$attrs.class">
        <b-card
            no-body
        >
            <vue-plyr>
                <div class="plyr__video-embed">
                    <iframe
                        :src="item.text"
                        allowfullscreen allowtransparency allow="autoplay"
                    >
                    </iframe>
                </div>
            </vue-plyr>
        </b-card>
    </div>
</template>

<script>
import RadioInput from './RadioInput.vue'

export default {
    mixins: [RadioInput],
}
</script>

<style lang="scss">
.plyr--video{
    border-radius: 16px;
}

.youtube{
    max-width: 85%;
    margin: auto;
}
</style>
