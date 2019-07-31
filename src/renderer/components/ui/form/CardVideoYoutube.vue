<template>
    <div v-if="item" class="card--youtube" :class="$attrs.class">
        <b-card
            no-body
        >
            <vue-plyr>
                <div class="plyr__video-embed">
                    <iframe
                        src="https://www.youtube.com/watch?v=GO94XCuXEqs?iv_load_policy=3&playsinline=1&showinfo=0&rel=0&enablejsapi=1"
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

