<template>
    <div class="container-fluid friends-name">
        <b-row align-h="center" align-v="center">
            <b-col class="activity-values">
                <b-row>
                    <b-col
                        v-for="(friend, index) in friendsAux"
                        :key="index"
                        class="friends-divider"
                        md="3"
                        cols="12"
                    >
                        <b-card no-body class="my-2">
                            <b-card-body class="outer">
                                <div class="card-input card--input-image">
                                    <label>
                                        <b-card no-body>
                                            <b-card-body class="icon-photo">
                                                <input
                                                    :id="`file${index}`"
                                                    :ref="`file${index}`"
                                                    type="file"
                                                    name="friend-image"
                                                    accept="image/jpeg, image/png"
                                                    @change="
                                                        handleFileUpload(index)
                                                    "
                                                />
                                            </b-card-body>
                                        </b-card>
                                    </label>
                                </div>
                                <async-image
                                    v-if="friend.imgSrc === null"
                                    class="img-placeholder"
                                    src="https://flash.za.com/wp-content/uploads/2015/08/Generic-Profile-1600x1600.png"
                                    alt="placeholder"
                                />
                                <div v-else class="image">
                                    <img :src="friend.imgSrc" class="photo" />
                                </div>
                                <div class="card-input card--input-text ">
                                    <label>
                                        <b-card no-body>
                                            <b-card-body>
                                                <input
                                                    id="input-name"
                                                    v-model="friend.name"
                                                    type="text"
                                                    maxlength="11"
                                                    autocomplete="off"
                                                    @blur="
                                                        addLocalFriend(
                                                            friend,
                                                            index
                                                        )
                                                    "
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
import { mapState, mapActions } from 'vuex';
import ui from '@/components/ui';
import alerts from '@/components/alerts';
import AsyncImage from '@ui/AsyncImage';
import { cloneDeep, sortBy, shuffle } from 'lodash';
import {
    MapMixins,
    ListMixin,
    CreateAnswersMixins,
    createAnswer
} from '@ui/activities/mixins';

export default {
    components: {
        ...ui,
        ...alerts,
        AsyncImage
    },
    mixins: [MapMixins, ListMixin, CreateAnswersMixins],
    data() {
        return {
            localFriends: null,
            friendsAux: null
        };
    },
    computed: {
        ...mapState('User', ['currentUser']),
        ...mapState('Activity', ['activity', 'answers']),
        friends() {
            return this.localFriends;
        }
    },
    created() {
        this.setActivityAttrs({ total_correct_items: this.getKeys.length });
        this.localFriends = [];
        for (let i = 0; i < 4; i++) {
            this.localFriends.push({
                name: '',
                imgSrc: null,
                id: i
            });
        }
        this.friendsAux = cloneDeep(this.localFriends);
    },
    watch: {
        friends: {
            handler() {
                console.log(this.checkAllFriendFilled());
                console.log(this.localFriends);
                if (this.checkAllFriendFilled()) {
                    for (let i = 0; i < this.localFriends.length; i++)
                        this.addNewFriend(this.localFriends[i]);
                    this.triggerSuccess();
                }
            },
            deep: true
        }
    },
    mounted() {
        this.createAnswersArray();
        this.activity.pointings[0].quantity = 30;
        this.activity.pointings[1].quantity = 30;
    },
    methods: {
        ...mapActions('Activity', ['setActivityAttrs', 'triggerSuccess']),
        ...mapActions('User', ['addFriend']),
        // ...mapActions('Alert',['showAlertActivitySuccess']),
        handleFileUpload(index) {
            let file = this.$refs[`file${index}`][0].files[0];
            let reader = new FileReader();
            reader.onload = e => {
                this.localFriends[index].imgSrc = e.target.result;
                this.friendsAux[index].imgSrc = e.target.result;
            };
            reader.onerror = function(error) {
                console.log(error);
            };
            reader.readAsDataURL(file);
        },
        addNewFriend(data) {
            this.addFriend(data);
        },
        addLocalFriend(friend, index) {
            this.localFriends[index].name = friend.name;
        },
        checkAllFriendFilled() {
            for (let index in this.localFriends) {
                if (
                    this.localFriends[index].imgSrc == null ||
                    this.localFriends[index].name.length == 0
                ) {
                    return false;
                }
            }

            return true;
        }
    }
};
</script>
<style lang="scss">
.friends-name {
    .img-placeholder,
    .image {
        width: 100%;
        height: 200px;
    }

    .image {
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            margin: unset;
        }
    }

    .friends-divider {
        padding: 0.5rem;
        min-height: 333px;

        .card.my-2 {
            border-radius: 1rem;
            min-height: 300px;
            display: flex;
            align-items: center;
            justify-content: space-around;

            .outer {
                padding: 10px;
            }
        }
    }

    .card--input-image {
        top: 5px;
        position: absolute;
        left: 5px;
        z-index: 99;

        .icon-photo {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 49px;
            height: 44px;
            cursor: pointer;
            @include embed_image(
                '~@/assets/images/icons/comecar/photo-camera.png',
                30px,
                24px
            );
        }

        .card-body {
            padding: unset !important;
        }

        input {
            width: 0;
            height: 0;
            visibility: hidden;
            outline: none;
        }
    }
}
</style>
