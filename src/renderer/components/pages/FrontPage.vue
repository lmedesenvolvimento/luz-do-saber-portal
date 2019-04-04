<template>
    <!-- <div id="frontpage" class="page-container">        
        <div class="container">
            <b-card class="mt-5">
                <b-card-body>
                    <h1>Modules</h1>
                    <ul>
                        <li v-for="m in modules" :key="m.id">
                            <router-link :to="{ name: 'module', params: { module_slug: m.slug } }" replace>
                                {{ m.title }}
                                <vue-circle
                                    :progress="50"
                                    :size="100"
                                    :reverse="false"
                                    line-cap="round"
                                    :fill="fill"
                                    empty-fill="rgba(0, 0, 0, .1)"
                                    :animation-start-value="0.0"
                                    :start-angle="0"
                                    insert-mode="append"
                                    :thickness="5"
                                    :show-percent="true"
                                    @vue-circle-progress="progress"
                                    @vue-circle-end="progress_end">
                                </vue-circle>
                            </router-link>
                        </li>
                    </ul>
                </b-card-body>
            </b-card>
        </div>
    </div> -->

    <div id="frontpage" class="page-container">        
        <main>
            <b-container fluid>
                <b-row align-v="center" align-h="center" class="flex-2 content">          
                    <b-container>
                    <!-- <h1>Modules</h1> -->
                        <b-row align-v="center" align-h="center">
                            <div v-for="m in modules" :key="m.id">
                                <router-link :to="{ name: 'module', params: { module_slug: m.slug } }" replace>
                                    <!-- {{ m.title }} -->
                                    <vue-circle 
                                        :label="m.title"
                                        :image="getModuleImage(m)"
                                        :progress="50"
                                        :color="getModuleColor(m)">
                                    </vue-circle>
                                </router-link>
                            </div>
                        </b-row>
                    </b-container>
                </b-row>
            </b-container>
        </main>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import VueCircle from './CircleProgress'

export default {
    components: {
        VueCircle
    },
    created(){
        this.fetchModules()
        console.log(this.modules);
        
    },
    computed: {        
        ...mapState('Modules', ['modules'])
    },
    methods: {
        getModuleImage(module){
            switch (module.slug) {
                case 'comecar':
                    return require('@/assets/images/btn-start.png')
                case 'ler':
                    return require('@/assets/images/btn-read.png')
                case 'escrever':
                    return require('@/assets/images/btn-write.png')
                default:
                    break;
            }
        },
        getModuleColor(module){
            switch (module.slug) {
                case 'comecar':
                    return  { color: 'red' }
                case 'ler':
                    return { color: 'blue' }
                case 'escrever':
                    return { color: 'green' }
                default:
                    break;
            }
        },
        ...mapActions('Modules',['fetchModules'])
    },
    data(){
        return {
            charts: [
                { 
                    label: "Começar",
                    color: "#ec2727",
                    image: require('@/assets/images/btn-start.png'),
                    totalCompleted: 30
                },
                { 
                    label: "Ler",
                    color: "#00963F",
                    image: require('@/assets/images/btn-read.png'),
                    totalCompleted: 65
                },
                { 
                    label: "Escrever",
                    color: "#007CB2",
                    image: require('@/assets/images/btn-write.png'),
                    totalCompleted: 50
                },
                { 
                    label: "Livros",
                    color: "#F39E00",
                    image: require('@/assets/images/btn-books.png'),
                    totalCompleted: 35
                },
            ]
        }
    }
}
</script>

<style>

</style>
