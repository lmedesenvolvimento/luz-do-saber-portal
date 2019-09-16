<template>
    <div>
        <div                             
            class="journal-page"
        >
            <div class="journal-decoration-1" />
            <div class="journal-decoration-2" />
            <div class="journal-content">
                <div v-if="haveTitle" class="journal-cover-title">
                    <input 
                        v-model="coverTitle" 
                        type="text" 
                        placeholder="Insira o nome do jornal"
                    />
                </div>
                <div v-else-if="haveStoryTitle">
                    <input 
                        v-for="i in 2" :key="i"
                        :v-model="{page1Title: i == 1, page1Subtitle: i == 2}" 
                        :class="{'journal-page-title': i == 1, 'journal-input-story-subtitle': i == 2}"
                        type="text" 
                        :placeholder="placeholderTitle(i)"
                    />
                </div>
                <journal-page-image
                    v-if="haveCoverImage"
                />               
                <div v-if="haveLeftAndRightStory">
                    <div v-for="i in 2" :key="i" :class="{'journal-story-left': i == 1, 'journal-story-right': i == 2}">
                        <div v-for="j in 2" :key="j" :class="{'journal-story-title': j == 1, 'journal-story-subtitle': j == 2}">
                            <textarea 
                                :v-model="{coverStoryLeftTitle: i == 1 && j == 1, coverStoryRightTitle: i == 2 && j == 1,
                                           coverStoryLeftText: i == 1 && j == 2, coverStoryRightText: i == 2 && j == 2}" 
                                :cols="numberCols(j)" 
                                :rows="numberRows(j)" 
                                :class="{'journal-input-story-title': j == 1, 'journal-input-story-text': j == 2}" 
                                type="text" 
                                :placeholder="placeholderStory(i, j)"
                            />
                        </div>                                        
                    </div> 
                </div>
            </div>
        </div>
        <div class="journal-decoration-1" />
    </div>
</template>

<script>
import JournalPageImage from './JournalPageImage';
export default {
    components: { 
        JournalPageImage
    },
    props: {
        typePage: String,
        haveTitle: Boolean,
        haveStoryTitle: Boolean,
        haveCoverImage: Boolean,
        imageAboveContent: Boolean,
        haveLeftAndRightStory: Boolean,
        extraRows: Number
    },
    data(){
        return {
            coverTitle: '',
            page1Title: '',
            page1Subtitle: '',   
        }
    },    
    methods: {
        placeholderTitle(i){
            if(i == 1) return 'Matéria de destaque';
            else return 'Subtítulo da matéria'
        },       
        placeholderStory(i, j){
            if (i == 1){
                if (j == 1){
                    return 'Titulo do lado esquerdo';
                } else {
                    return 'Insira o conteúdo da matéria do lado esquerdo';
                }
            } else {
                if (j == 1){
                    return 'Titulo do lado direito';
                } else {
                    return 'Insira o conteúdo da matéria do lado direito';
                }
            }
        },
        numberCols(j){
            if(j == 1) return 17;
            else return 20;
        },
        numberRows(j){
            if(j == 1) return 2;
            else return (7 + this.extraRows);
        },               
    }
}
</script>
