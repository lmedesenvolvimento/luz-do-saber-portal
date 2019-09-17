<template>
    <div>
        <div                             
            class="journal-page"
        >
            <div class="journal-decoration-1" />
            <div class="journal-decoration-2" />
            <div class="journal-content">
                <div v-show="haveTitle" class="journal-cover-title">
                    <input 
                        v-model="title" 
                        type="text" 
                        placeholder="Insira o nome do jornal"
                    />
                </div>
                <div v-show="haveStoryTitle">
                    <input 
                        v-for="i in 2" :key="i"
                        :v-model="{storyTitle: i == 1, storySubtitle: i == 2}" 
                        :class="{'journal-page-title': i == 1, 'journal-input-story-subtitle': i == 2}"
                        type="text" 
                        :placeholder="placeholderTitle(i)"
                    />
                </div>
                <div
                    v-show="haveCoverImage && imageAboveContent"
                >
                    <div>                       
                        <journal-page-image 
                            image-type="full"
                        />  
                    </div>                   
                </div>                             
                <div v-show="haveLeftAndRightStory">
                    <b-row>
                        <b-col v-for="i in 2" :key="i" :class="{'journal-story-left': i == 1, 'journal-story-right': i == 2}">
                            <div v-for="j in 2" :key="j" :class="{'journal-story-title': j == 1, 'journal-story-subtitle': j == 2}">
                                <textarea 
                                    :v-model="{storyLeftTitle: i == 1 && j == 1, storyRightTitle: i == 2 && j == 1,
                                               storyLeftText: i == 1 && j == 2, storyRightText: i == 2 && j == 2}" 
                                    :cols="numberCols(j)" 
                                    :rows="numberRows(j)" 
                                    :class="{'journal-input-story-title': j == 1, 'journal-input-story-text': j == 2}" 
                                    type="text" 
                                    :placeholder="placeholderStory(i, j)"
                                />
                            </div>                                        
                        </b-col> 
                    </b-row>
                </div>
                <div
                    v-show="haveCoverImage && !imageAboveContent"
                >
                    <b-col>
                        <journal-page-image 
                            image-type="full"
                        />  
                    </b-col>                   
                </div>
                <div v-show="haveThreePartsStory" class="journal-three-parts-story">
                    <b-row>
                        <b-col>
                            <div class="left">
                                <div class="journal-story-title">
                                    <textarea                                         
                                        cols="10" rows="2" 
                                        class="journal-input-story-title" 
                                        type="text" 
                                        placeholder="Título superior"
                                    />
                                </div>
                                <div class="journal-story-subtitle">
                                    <textarea                                         
                                        cols="12" rows="11"
                                        class="journal-input-story-text"
                                        type="text" 
                                        placeholder="Insira o conteúdo da matéria aqui"
                                    />
                                </div>
                            </div>
                        </b-col>
                        <b-col>
                            <div class="middle">     
                                <journal-page-image 
                                    image-type="three-parts"
                                />                                            
                                <div class="journal-story-cont">
                                    <textarea                                         
                                        cols="11" rows="6"
                                        class="journal-input-story-text"
                                        type="text" 
                                        placeholder="Insira a continuação da matéria"
                                    />
                                </div>
                            </div>
                        </b-col>
                        <b-col>
                            <div class="right">
                                <div class="journal-story-cont">
                                    <textarea                                          
                                        cols="12" rows="13"
                                        class="journal-input-story-text"
                                        type="text" 
                                        placeholder="Insira a continuação da matéria"
                                    />
                                </div>
                            </div>
                        </b-col>
                    </b-row>
                </div>
                <div 
                    v-show="footerImage"
                >
                    <journal-page-image 
                        image-type="footer"
                    />    
                </div>
                <div
                    v-show="footerText"
                >
                    <div class="journal-story-cont">
                        <textarea 
                            v-model="storyFooterText" 
                            cols="44" rows="2"
                            class="journal-input-story-text"
                            type="text" 
                            placeholder="Insira um conteúdo aqui"
                        />
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
        extraRows: Number,
        haveThreePartsStory: Boolean,
        footerImage: Boolean,
        footerText: Boolean
    },
    data(){
        return {
            title: '',
            storyTitle: '',
            storySubtitle: '',   
            storyLeftTitle: '',
            storyRightTitle: '',
            storyLeftText: '',
            storyRightText: '',
            storyFooterText: ''
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
