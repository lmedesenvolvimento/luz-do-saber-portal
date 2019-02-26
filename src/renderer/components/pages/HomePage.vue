<template>
    <div class="page-container">
        <ls-navbar>
            <div class="icon-home"></div>
            <span class="flex"></span>
            <div class="navbar-title">Começar</div>
            <span class="flex"></span>
        </ls-navbar>
        <div class="container">
            <ls-gameplay :activities="activities"></ls-gameplay>
        </div>
    </div>
</template>
<script>
import ui from '@/components/ui'
import { ACTIVITY_LIST } from '@/index.const'

export default {
    components: { ...ui },
    data(){
        return {
            activities: [ACTIVITY_LIST]
        }
    }
}
</script>
