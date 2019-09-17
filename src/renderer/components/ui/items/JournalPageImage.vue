<template>
    <div>
        <div             
            :class="{'journal-full-image': imageType == 'full', 'journal-three-story-image': imageType == 'three-parts', 'journal-footer-image': imageType == 'footer'}"
            @click="$refs.imageInput.click()"
        >            
            <input 
                ref="imageInput"
                style="display: none"                                             
                type="file"     
                accept="image/gif, image/jpeg, image/png"                                         
                @change="onFileSelectedCover"                 
            >
            <div v-if="image" :class="{'full-image': imageType == 'full', 'three-story-image': imageType == 'three-parts', 'footer-image': imageType == 'footer'}">
                <img :src="image" alt="Imagem de capa">
            </div>                                       
            <div v-else class="placeholder-image">
                <async-image src="" alt="placeholder" />
            </div>
        </div>
    </div>
</template>

<script>
import AsyncImage from '@ui/AsyncImage';
export default {
    components: {        
        AsyncImage
    },
    props: {
        imageType: String
    },
    data(){
        return{
            image: null
        }
    },
    methods: {
        onFileSelectedCover(event) {
            const file = event.target.files[0]
            this.image = URL.createObjectURL(file);
        }, 
    }
    
}
</script>