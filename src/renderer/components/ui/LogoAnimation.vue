<template>
    <div id="logo-intro-animation">
        <Lottie v-if="$context === 'eja'" :path="eja" :animated="animated" :total-seconds="4" />
        <Lottie v-else :path="fundamental" :animated="animated" :total-seconds="4" />
    </div>
</template>

<script>
import Lottie from './Lottie'

export default {
    components: { Lottie },
    props: {
        animated: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            fundamental: 'html5/fundamental/data.json',
            eja: 'html5/eja/data.json'
        }
    }
}
</script>

<style>

</style>