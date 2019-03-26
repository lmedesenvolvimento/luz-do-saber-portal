import { dropRight } from 'lodash'

export const RouteMixin = {
    computed: {
        historyBack() {            
            let backURL = dropRight(this.$route.fullPath.split('/')).join('/')
            return backURL
        },
        historyBackUnit(){
            let backURL = dropRight(this.$route.fullPath.split('/'), 2).join('/')
            return backURL
        }
    }
}