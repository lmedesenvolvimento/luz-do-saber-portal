<template>
    <div id="frontpage" class="page-container">        
        <div class="container">
            <b-card class="mt-5">
                <b-card-body>
                    <h1>Modules</h1>
                    <ul>
                        <li v-for="m in modules" :key="m.id">
                            <router-link :to="{ name: 'module', params: { module_slug: m.slug } }" replace>
                                {{ m.title }}
                            </router-link>            
                        </li>
                    </ul>
                </b-card-body>
            </b-card>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
    created(){
        this.fetchModules()
    },
    computed: {
        ...mapState('Modules', ['modules'])
    },
    methods: {
        ...mapActions('Modules',['fetchModules'])
    }
}
</script>

<style>

</style>
