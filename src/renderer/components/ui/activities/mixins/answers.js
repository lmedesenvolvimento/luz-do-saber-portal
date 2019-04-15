import uniqid from 'uniqid'
import { filter, range } from 'lodash'
import { mapState, mapActions } from 'vuex'

export const CreateAnswersMixins = {
    computed: {
        ...mapState('Activity', ['activity'])
    },    
    methods: {
        createAnswersArray() {
            if (!this.activity) return
            // Create answer number based with total_correct_items
            let { items, total_correct_items } = this.activity
            let answers = []

            range(0, total_correct_items).forEach(position => {
                // get key with has values_ids
                let key = filter(items.keys, k => k.value_ids.length)[position]
                if (key){
                    let answer = createAnswer(key)
                    answers.push(answer)
                }
            })

            this.setAnswers(answers)
        },
        ...mapActions('Activity', ['setAnswers'])        
    }
}

export function createAnswer(key){
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
            data: key.value_ids, // Number or Array
            type: 'value'
        }
    }
}