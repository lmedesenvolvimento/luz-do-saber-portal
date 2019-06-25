<template>
    <div class="container-fluid">
        <b-col>
            <b-row>
                <b-col v-if="hasKeys" class="activity-keys">
                    <b-row>
                        <b-col v-for="(item, position) in getKeys" :key="position" :sm="keyColSize" class="item"> 
                            <!-- <Item 
                                v-if="answers"
                                :item="item"
                                :type="'key'"
                                :template="activity.item_template.key"
                            /> -->
                            <ls-card-audio-listen
                                :item="item"
                                :type="key"
                                :template="activity.item_template.key"
                            >
                                <!-- <img src="https://picsum.photos/300/200" alt=""> -->
                                <!-- {{ item.images[0].url }} -->
                            </ls-card-audio-listen>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>

            <b-row>
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
                                        v-focus="true"
                                        type="text"
                                        maxlength="8"
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

        <b-col>
            <ls-card-display>
                <p>palavras erradas:</p>

                <ul>
                    <li>Primeira</li>
                    <li>Palavra</li>
                    <li>Errada</li>
                </ul>
            </ls-card-display>
        </b-col>
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
}
</script>