<template>
    <div class="page-container">
        <ls-navbar>
            <div class="icon-home"></div>
            <span class="flex"></span>
            <div class="navbar-title">Começar</div>
            <span class="flex"></span>
        </ls-navbar>
        <div class="container">
            <ls-gameplay></ls-gameplay>
        </div>
    </div>
</template>
<script>
import ui from '@/components/ui'
export default {
    components: { ...ui }
}
</script>
