<template>
    <div id="app">
        <b-container fluid class="d-flex align-item-center justify-content-center fill">
            <transition name="page" mode="out-in">
                <router-view></router-view>
            </transition>
        </b-container>
    </div>
</template>

<script>
export default {
}
</script>

<style>
</style>
