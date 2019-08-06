<template>
    <div
        id="carta"
        class="page-container escrever"
    >
        <navbar
            navbar-title="Lista"
            :navbar-subtitle="''"
        />
        <div class="page-container-wrap-spacing">
            <b-card>
                <p>Jornal</p>
            </b-card>
        </div>
    </div>
</template>

<script>
import Navbar from '../ui/navbars/Navbar'
export default {
    components: { Navbar },
}
</script>

<style>

</style>
