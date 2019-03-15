import uniqid from 'uniqid'
import { first } from 'lodash'

export const CreateAnswersMixins = {
    methods: {
        createAnswersArray() {
            this.createAnswersHasOne()
        },
        createAnswersHasOne() {
            let answers = []
            let key = this.getFirstKey()
            
            answers.push(createAnswer(key))

            this.setAnswers(answers)
        },
        getFirstKey() {
            let { keys } = this.activity.items
            return first(keys)
        }
    }
}

function createAnswer(key){
    let id = uniqid()
    return {
        ref: id,
        key: {
            parent_ref: id,
            data: key,
            type: 'key'
        },
        value: {
            parent_ref: id,
            data: null, // Number or Array
            type: 'value'
        }
    }
}