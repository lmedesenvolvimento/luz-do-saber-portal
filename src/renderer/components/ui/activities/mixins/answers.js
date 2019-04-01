import uniqid from 'uniqid'
import { filter, range } from 'lodash'

export const CreateAnswersMixins = {
    methods: {
        createAnswersArray() {
            // Create answer number based with total_correct_items
            let { items, total_correct_items } = this.activity
            let answers = []

            range(0, total_correct_items).forEach(position => {
                // get key with has values_ids
                let key = filter(items.keys, k => k.value_ids)[position]
                let answer = createAnswer(key)
                answers.push(answer)
            })

            this.setAnswers(answers)
        }        
    }
}

function createAnswer(key){
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