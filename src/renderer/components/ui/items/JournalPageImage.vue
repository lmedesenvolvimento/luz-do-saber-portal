<template>
    <div>
        <div             
            class="journal-cover-image"
            @click="$refs.coverImageInput.click()"
        >
            <input 
                ref="coverImageInput"
                style="display: none"                                             
                type="file"     
                accept="image/gif, image/jpeg, image/png"                                         
                @change="onFileSelectedCover"                 
            >
            <div v-if="coverImage" class="cover-image">
                <img :src="coverImage" alt="Imagem de capa">
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
    data(){
        return{
            coverImage: ''
        }
    },
    methods: {
        onFileSelectedCover(event) {
            const file = event.target.files[0]
            this.coverImage = URL.createObjectURL(file);
        }, 
    }
    
}
</script>