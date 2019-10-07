<template>
    <div id="base">
        <div v-if="isActivity || isJoinActivity" class="activity">
            <ls-activity-default
                v-if="activitySubtypes.row === activity.subtype.slug"
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
            />
            <ls-activity-default
                v-else-if="activitySubtypes.rowReverse === activity.subtype.slug"
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
                :reverse="true"
            />
            <ls-activity-default
                v-else-if="activitySubtypes.column === activity.subtype.slug"
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
                :horizontal="false"
            />
            <ls-activity-default
                v-else-if="activitySubtypes.columnReverse === activity.subtype.slug"
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
                :horizontal="false"
                :reverse="true"
            />
        </div>
        <div v-else-if="isQuestionnaire" class="activity">
            <ls-activity-questionnaire
                v-if="activitySubtypes.row === activity.subtype.slug"
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
            />
            <ls-activity-questionnaire
                v-else-if="activitySubtypes.rowReverse === activity.subtype.slug"
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
                :reverse="true"
            />
            <ls-activity-questionnaire
                v-else-if="activitySubtypes.column === activity.subtype.slug"
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
                :horizontal="false"
            />
            <ls-activity-questionnaire
                v-else-if="activitySubtypes.columnReverse === activity.subtype.slug"
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
                :horizontal="false"
                :reverse="true"
            />
        </div>
        <div v-else-if="types.game === activity.type.slug" class="game">
            <ls-activity-begin-bingo
                v-if="gameSubtypes.bingo === activity.subtype.slug"
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
            />
            <ls-activity-begin-half
                v-if="gameSubtypes.hideHalf === activity.subtype.slug"
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
            />
            <ls-activity-begin-unscramble
                v-if="gameSubtypes.unscramble === activity.subtype.slug"
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
            />
            <ls-activity-begin-rearrange-name
                v-if="gameSubtypes.rearrangeName === activity.subtype.slug"
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
            />
            <ls-activity-begin-jigsaw
                v-if="gameSubtypes.jigsaw === activity.subtype.slug"
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
            />
            <ls-activity-begin-domino-name
                v-if="gameSubtypes.dominoName === activity.subtype.slug"
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
            />
            <ls-activity-begin-memory-game
                v-if="gameSubtypes.memoryGame === activity.subtype.slug"
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
            />
            <ls-activity-begin-word-search
                v-if="gameSubtypes.wordSearch === activity.subtype.slug"
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
            />
            <ls-activity-my-cracha
                v-if="gameSubtypes.myCracha === activity.subtype.slug"
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
            />
            <ls-activity-read-word-bingo
                v-if="gameSubtypes.wordBingo === activity.subtype.slug"
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
            />
            <ls-activity-match-friends-initial
                v-if="gameSubtypes.matchFriendsInitial === activity.subtype.slug"
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
            />
            <ls-activity-box-of-words
                v-if="gameSubtypes.boxWords === activity.subtype.slug"
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
            />
            <ls-activity-friends-name
                v-if="gameSubtypes.friendsName === activity.subtype.slug"
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
            />
            <ls-activity-read-grouping
                v-if="gameSubtypes.grouping === activity.subtype.slug"
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
            />
            <ls-activity-read-dragging-syllables
                v-if="gameSubtypes.draggingSyllables === activity.subtype.slug"
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
            />
            <ls-activity-read-complete-word
                v-if="gameSubtypes.completeWordSyllables === activity.subtype.slug"
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
                :type="'silaba'"
            />
            <ls-activity-read-complete-word
                v-if="gameSubtypes.completeWordLetters === activity.subtype.slug"
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
                :type="'letra'"
            />
            <ls-activity-read-the-words-secret
                v-if="gameSubtypes.theWordsSecret === activity.subtype.slug"
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
            />
            <ls-activity-read-secret-word
                v-if="gameSubtypes.secretWord === activity.subtype.slug"
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
            />
            <ls-activity-read-complete-sentence
                v-if="gameSubtypes.completeSentence === activity.subtype.slug"
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
            />
            <ls-activity-write-word
                v-if="gameSubtypes.writeTheWord === activity.subtype.slug" 
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
            />
            <ls-activity-read-letter-group
                v-if="gameSubtypes.letterGroup === activity.subtype.slug" 
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
            />
            <ls-activity-read-store-letters
                v-if="gameSubtypes.storeLetters === activity.subtype.slug" 
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
            />
            <ls-activity-read-accentuation
                v-if="gameSubtypes.accentuation === activity.subtype.slug" 
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
            />
            <ls-activity-read-text-reading
                v-if="gameSubtypes.textReading === activity.subtype.slug" 
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
            />
            <ls-activity-find-the-word
                v-if="gameSubtypes.findTheWord === activity.subtype.slug" 
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
            />
            <ls-activity-assemble-word
                v-if="gameSubtypes.assembleWord === activity.subtype.slug" 
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
            />
            <ls-activity-uppercase-letters
                v-if="gameSubtypes.uppercaseLetters === activity.subtype.slug" 
                :value-col-size="valueColSize"
                :key-col-size="keyColSize"
            />
        </div>
    </div>
</template>

<script>
import { clone, values } from 'lodash'
import { mapState, mapActions } from 'vuex'

import { TOTAL_COLUMNS } from '@/index.const'
import { ActivityTypes, ActivitySubtypes, GameSubtypes } from '@/constants'

import ActitivitiesComponents from './index'

export default {
    components: {
        ...ActitivitiesComponents
    },
    computed: {
        gameSubtypes(){
            return GameSubtypes
        },
        activitySubtypes(){
            return ActivitySubtypes
        },
        types(){
            return ActivityTypes
        },
        isActivity(){
            return values(ActivityTypes.activity.default).includes(this.activity.type.slug)
        },
        isQuestionnaire(){
            return values(ActivityTypes.activity.questionnaire).includes(this.activity.type.slug)
        },
        isJoinActivity(){
            return values(ActivityTypes.activity.join).includes(this.activity.type.slug)
        },
        keyColSize(){
            return Math.abs(TOTAL_COLUMNS / this.activity.item_template.key.total_per_line)
        },
        valueColSize(){
            return Math.abs(TOTAL_COLUMNS / this.activity.item_template.value.total_per_line)
        },
        ...mapState('Activity', ['activity'])
    }
}
</script>
