<template>
    <div>
        <div v-if="haveTitle" class="journal-cover-title">
            <input 
                v-model="coverTitle" 
                type="text" 
                placeholder="Insira o nome do jornal"
            />
        </div>
        <div v-else-if="haveStoryTitle" class="journal-page-1-header">
            <input 
                v-for="i in 2" :key="i"
                :v-model="{page1Title: i == 1, page1Subtitle: i == 2}" 
                :class="{'journal-page-title': i == 1, 'journal-input-story-subtitle': i == 2}"
                type="text" 
                :placeholder="placeholderTitle(i)"
            />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        haveTitle: Boolean,
        haveStoryTitle: Boolean
    },
    data(){
        return {
            coverTitle: '',
            page1Title: '',
            page1Subtitle: ''

        }
    },
    methods: {
        placeholderTitle(i){
            if(i == 1) return 'Matéria de destaque';
            else return 'Subtítulo da matéria'
        }
    }
}
</script>
