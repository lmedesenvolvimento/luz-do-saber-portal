<template>
    <div
        id="carta"
        class="page-container escrever"
    >
        <navbar
            navbar-title="Carta"
            :navbar-subtitle="''"
        />
        <editor></editor>
    </div>
</template>

<script>
import Navbar from '../ui/navbars/Navbar'

export default {
    components: { Navbar, Editor },
}
</script>

<style>

</style>
