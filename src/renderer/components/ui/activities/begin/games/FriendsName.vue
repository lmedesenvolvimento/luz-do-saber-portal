<template>
    <div class="container-fluid">
        <b-row  class="column">  
            <b-card v-for="(friend, index) in localFriends" :key="index" no-body>
                <b-card-body>
                    <div class="card-input card-input-text ">
                        <label>
                            <b-card 
                                no-body
                            >
                                <b-card-body>
                                    <input
                                        id="input-name"
                                        v-model="friend.name"
                                        type="text"
                                        maxlength="11"
                                        @blur="addLocalFriend(friend,index)"
                                    />
                                </b-card-body>
                            </b-card>
                        </label>
                    </div>
                </b-card-body>               
            </b-card>
        </b-row>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ui from '@/components/ui'
import alerts from '@/components/alerts'
import { sortBy, shuffle } from 'lodash'
import { MapMixins, ListMixin, CreateAnswersMixins,createAnswer } from '@ui/activities/mixins'

export default {
    components: { 
        ...ui,
        ...alerts
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data(){
        return {
            localFriends:null,
        }
    },
    computed:{
        ...mapState('User', ['currentUser']),
        ...mapState('Activity',['activity','answers'])
    },
    watch: {
        currentUser(data){
            console.log('current user', data)
        },
        activity(data){
            console.log('activity', data)
        },
        answers(data){
            console.log('answers',data)
        },
        localFriends: function(data){
            for (var item in data ){

                console.log('local friends', this.localFriends[item].name)
            }
        }
    },
    created(){
        console.log('created yeyey')
        this.setActivityAttrs({ total_correct_items: this.getKeys.length })
        this.localFriends =  []
        for(let i = 0; i < 6; i++){
            this.localFriends.push({name: ''})
        }
        
    },
    mounted() {
        this.createAnswersArray()
        this.activity.pointings[0].quantity = 30
        this.activity.pointings[1].quantity = 30
        console.log('created activity',this.activity)
    },
    methods: {        
        
        ...mapActions('Activity', ['setActivityAttrs','triggerSuccess']),
        ...mapActions('User',['addFriend']),
        // ...mapActions('Alert',['showAlertActivitySuccess']),
        addNewFriend(data){
            this.addFriend(data)

        },
        addLocalFriend(friend,index){
            console.log('add freind index', index, friend.name)
            this.localFriends[index].name = friend.name

            console.log('add local freind teste', this.localFriends)
            
            if(this.checkAllFriendFilled()){
                this.triggerSuccess()
            }
        },
        checkAllFriendFilled(){
            
            for(let index in this.localFriends){
                if(this.localFriends[index].name.length ==0){
                    return false
                }
            }
        
            return true
            
        }
    },
     
}
</script>
