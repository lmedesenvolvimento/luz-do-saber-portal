<template>
    <div class="container-fluid">        
        <b-row align-h="center" :class="{'column': !horizontal,'reverse': (reverse && horizontal), 'reverse-column': ( reverse && !horizontal )}">
            <b-col
                v-if="hasImageSubtitle" 
                class="flex-4 activity-keys"
            >
                <b-row>
                    <b-col align-self="center" :md="12" :sm="12" class="item"> 
                        <Item 
                            v-if="answers"
                            :item="imageSubtitle"
                            :type="'value'"
                            :template="keyTemplate"
                        />
                    </b-col>                    
                </b-row>
            </b-col>
            <b-col
                v-if="hasImageSubtitle" 
                class="flex-1 activity-keys" 
            >
                <b-row>
                    <div v-if="hasSubtitle" class="gameplay-description">
                        <div class="gameplay-description-text mouse-pointer" @click="playAudio()">{{ getSubtitle }} </div>
                    </div>                   
                </b-row>
            </b-col>
            <b-col
                v-if="hasValues" 
                class="flex-4 activity-values"
            >
                <b-row>
                    <b-col v-for="(item, position) in getValues" :key="position" align-self="center" :md="3" :sm="3" class="item"> 
                        <Item 
                            v-if="answers"
                            :item="item"
                            :type="'value'"
                            :template="valueTemplate"
                        />
                    </b-col>                    
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import { MapMixins, ListMixin, CreateAnswersMixins } from '@ui/activities/mixins'

export default {
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    computed: {
        hasImageSubtitle() {
            return this.activity.items.keys.length > 0
        },
        imageSubtitle() {
            return this.activity.items.keys[0]
        },
        keyTemplate() {
            const { font_size, custom, ...valueTemplate } = this.activity.item_template.value
            return ({ font_size: 'big', custom: 'game-display-descricao-imagem', ...valueTemplate })
        },
        valueTemplate() {
            const { font_size, custom, ...valueTemplate } = this.activity.item_template.value
            return ({ font_size: 'big', custom: '', ...valueTemplate })
        },
        hasSubtitle() {
            return !!this.activity.subtitle
        },
        getSubtitle() {
            return this.activity.subtitle.text
        }
    },
    mounted() {
        this.createAnswersArray()
    },
}
</script>

<style lang="scss" scoped>

.activity {
    .activity-values {
        /deep/.card-body {
            width: 180px;
            height: 180px;
            display: flex;
            img {
                max-height: 170px!important;
                max-width: 170px!important;
            }
        }
    }
}

</style>
