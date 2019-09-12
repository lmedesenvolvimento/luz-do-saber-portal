<template>
    <div class="container-fluid">
        <b-row align-h="center" align-v="center">
            <b-col class="activity-values">
                <b-row>
                    <b-col v-for="(friend, index) in localFriends" :key="index" class="friends-divider" md="3" cols="12">
                        <b-card no-body class="my-2">
                            <b-card-body class="outer">
                                <div class="card-input card--input-image">
                                    <b-card no-body>
                                        <b-card-body class="icon-photo">
                                            <input type="file" name="friend-image">
                                        </b-card-body>
                                    </b-card>
                                </div>
                                <async-image
                                    class="img-placeholder" 
                                    src="https://flash.za.com/wp-content/uploads/2015/08/Generic-Profile-1600x1600.png"
                                    alt="placeholder"
                                />                                
                                <div class="card-input card--input-text ">
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
                                                    autocomplete="off"
                                                    @blur="addLocalFriend(friend,index)"
                                                />
                                            </b-card-body>
                                        </b-card>
                                    </label>
                                </div>
                            </b-card-body>
                        </b-card>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ui from '@/components/ui'
import alerts from '@/components/alerts'
import AsyncImage from '@ui/AsyncImage'
import { sortBy, shuffle } from 'lodash'
import { MapMixins, ListMixin, CreateAnswersMixins,createAnswer } from '@ui/activities/mixins'

export default {
    components: {
        ...ui,
        ...alerts,
        AsyncImage
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
        }
    },
    created(){
        this.setActivityAttrs({ total_correct_items: this.getKeys.length })
        this.localFriends =  []
        for(let i = 0; i < 4; i++){
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

<style lang="scss">
    .img-placeholder{
        width: 100%;
    }

    .friends-divider{
        padding: 0.5rem;

        .card.my-2{
            border-radius: 1rem;

            .outer{
                padding: 10px;
            }
        }
    }

    .card--input-image{
        width: 60px;
        height: 64px;
        position: absolute;
        top: 5px;
        left: 5px;
        .icon-photo{
            width: 60px;
            height: 64px;
            @include embed_image("~@/assets/images/icons/comecar/photo-camera.png", 30px, 24px);
        }
        .card-body{
            padding: unset !important;
        }
        input{
            width: 0;
            height: 0;
            visibility: none;
        }
    }
</style>

