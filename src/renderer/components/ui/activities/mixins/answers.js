import uniqid from 'uniqid'
import { filter, range } from 'lodash'
import { mapState, mapActions } from 'vuex'

export const MapMixins = {
    computed: {
        ...mapState('Activity', ['activity', 'answers', 'currentUser'])
    },    
    methods: {
        ...mapActions('Activity', ['setAnswers','setActivityAttrs'])
    }
}

export const CreateAnswersMixins = { 
    methods: {
        createAnswersArray() {
            if (!this.activity) return
            // Create answer number based with total_correct_items
            let { items, total_correct_items } = this.activity
            let answers = []

            range(0, total_correct_items).forEach(position => {
                // get key with has values_ids
                let key = filter(items.keys, k => k.value_ids && k.value_ids.length)[position]

                if (!key) return

                key.value_ids.forEach(vid => {
                    let answer = createAnswer(key, vid)
                    answers.push(answer)
                })
            })

            this.setAnswers(answers)
        }
    }
}

export function createAnswer(key, value){
    if (!key) return
    
    let id = uniqid()

    return {
        ref: id,
        key: {
            parent_ref: id,
            data: key.id,
            type: 'key'
        },
        value: {
            parent_ref: id,
            data: value ? [value] : key.value_ids, // Number or Array
            type: 'value'
        }
    }
}