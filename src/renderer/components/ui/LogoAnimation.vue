<template>
    <div id="logo-intro-animation">
        <Lottie v-if="$context === 'eja'" :path="eja" :animated="animated" :total-seconds="50" />
        <Lottie v-else :path="fundamental" :animated="animated" :total-seconds="12" />
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
            fundamental: '/static/html5/fundamental/data.json',
            eja: '/static/html5/eja/data.json'
        }
    }
}
</script>

<style>

</style>