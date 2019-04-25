<template>
    <div class="bg-color" :style="{ 'background-color': bgColor }">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        bgColor: String
    }
}
</script>

<style>

</style>
