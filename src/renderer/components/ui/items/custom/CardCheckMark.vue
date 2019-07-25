<template>
    <div :id="`input-${uid}`" class="card-input card-checkmark" :class="$attrs.class">
        <label class="input-horizontal-align">
            <b-card
                class="check-mark"
                no-body
                :class="{ 'invalid': invalid, 'valid': valid, 'selected': selected }"
            >
                <b-card-body>
                    <img v-if="valid || invalid" class="check-image" src="@/assets/images/x.png" alt="x">
                </b-card-body>
            </b-card>

            <b-card
                class="limited-width-input"
                no-body
                :class="{ 'invalid': invalid, 'valid': valid, 'selected': selected }"
            >
                <fill-background :bg-color="bgColor">
                    <b-card-body>
                        <slot>
                            <div v-if="template.type === 'imagem'" class="image">
                                <async-image :src="item.images.length ? item.images[0].url : ''" :disable-zoom="true" />
                            </div>
                            <div v-else class="text">{{ item.text }}</div>
                        </slot>
                    </b-card-body>
                </fill-background>
            </b-card>

            <input
                class="input"
                type="radio"
                :name="$attrs.name"
                v-bind="$attrs"
                @click.prevent="onChange"
            />
        </label>
    </div>
</template>

<script>
import RadioInput from '@/components/ui/form/RadioInput.vue'
import AsyncImage from '@ui/AsyncImage'

export default {
    components: { AsyncImage },
    mixins: [RadioInput],
    props: {
        template: Object
    }
};
</script>
<style lang="scss" scoped>
    .card--radio-input{
        .input{
            display: block;
            visibility: hidden;
            width: 0px;
            height: 0px;
            background-color: black;
        }
        label{
            display: block;
            &:hover{
                cursor: pointer;
            }
        }
    }
</style>