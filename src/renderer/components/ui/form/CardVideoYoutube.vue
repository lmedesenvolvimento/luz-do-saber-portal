<template>
    <div v-if="item" class="card--youtube" :class="$attrs.class">
        <b-card
            no-body
        >
            <vue-plyr v-if="linkType === 'youtube'" ref="plyr" :emit="['ended']" @ended="ended">
                <div class="plyr__video-embed">
                    <iframe
                        :src="item.text"
                        allowfullscreen allowtransparency allow="autoplay"
                    >
                    </iframe>
                </div>
            </vue-plyr>
            <section v-if="linkType === 'link'" class="video-container">
                <video :src="item.text" controls width="720px" @ended="ended"></video>
            </section>
        </b-card>
    </div>
</template>

<script>
import RadioInput from './RadioInput.vue'

export default {
    mixins: [RadioInput],
    computed: {
        linkType() {
            if (this.item.text.startsWith('https://www.youtube.com/'))
                return 'youtube'
            if (this.item.text.startsWith('https://') || this.item.text.startsWith('http://'))
                return 'link'
            return 'notFound'
        }
    },
    methods: {
        ended(response) {
            this.setAnswer({
                type: 'value',
                data: undefined,
                vm: this
            })
        }
    }
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

.video-container {
    display: flex;
    align-items: center;
    justify-content: center;
    video {
        max-width: 720px;
    }
}
</style>
