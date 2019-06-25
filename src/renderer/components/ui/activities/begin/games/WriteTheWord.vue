<template>
    <div class="container-fluid">
        <b-row class="write-word">
            <b-col class="col-sm-4">
                <b-row v-if="hasKeys" class="activity-keys">
                    <b-col v-for="(item, position) in getKeys" :key="position" :sm="keyColSize" class="item"> 
                        <!-- <Item 
                            v-if="answers"
                            :item="item"
                            :type="'key'"
                            :template="activity.item_template.key"
                        /> -->
                        <ls-card-audio-listen
                            :item="item"
                            :template="activity.item_template.key"
                        >
                            <img src="https://picsum.photos/300/200" alt="">
                            <!-- {{ item.letters[0].text }} -->
                        </ls-card-audio-listen>
                    </b-col>
                
                    <b-col 
                        :class="{ 
                            'flex-4': getValues.length >= 12 
                        }"
                        class="activity-values" 
                    >
                        <div class="card-input card-input-text mt-2">
                            <label>
                                <b-card 
                                    no-body
                                >
                                    <b-card-body>
                                        <input
                                            v-model="answer"
                                            v-focus="true"
                                            type="text"
                                            maxlength="10"
                                            autocomplete="off"
                                            required
                                        />
                                    </b-card-body>
                                </b-card>
                            </label>
                        </div>
                    </b-col>
                </b-row>
            </b-col>

            <b-col class="col-sm-4">
                <ls-card-display class="wrong-words-display">
                    <p>palavras erradas:</p>

                    <div class="wrong-words-list">
                        <span>{{ answer }}</span>
                        <span>segunda</span>
                        <span>terceira</span>
                    </div>
                </ls-card-display>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import { ListMixin, MapMixins, CreateAnswersMixins, createAnswer } from '@ui/activities/mixins'
import ItemComponents from '@ui/form/index.js'

export default {
    components: {
        ...ItemComponents,
    },
    mixins: [ListMixin, MapMixins, CreateAnswersMixins],
    data() {
        return {
            answer: '',
        }
    },
    mounted() {
        console.log(this.item);
        
    }
}
</script>