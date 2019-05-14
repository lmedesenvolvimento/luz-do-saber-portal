<template>
    <div>
        <ls-card-draggable
            class="letters"
            v-if="type === 'value'"
            label="item.text" 
            name="card-input"
            type="key"
            :item="item"
            :bg-color="item.color"
        >
            {{ item.text }}
        </ls-card-draggable>
        <div v-if="type==='key'">
            <ls-card-droppable
                class="names"
                v-if="type === 'key'"
                label="item.text" 
                name="card-input"
                type="value"
                :item="item"
                :bg-color="item.color"
            >
                {{ item['first_letter'] }}
            </ls-card-droppable>
        </div>
    </div>
</template>

<script>
import { ItemProps } from '../index.js'
export default {
    mixins: [ItemProps],
    created(){
        console.log(this.item.text)
    }
}
</script>

<style lang="scss">
    .names{
        width: 100px;
        height: 110px;
        .card-input.card-droppable{
            height: 90px;
            .card{
                height: 90px;
                max-height: 90px;
                .bg-color{
                    min-height: 80px;
                    .card-body{
                        font-size: 30px !important;
                        min-height: 80px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }
            }
        }
    }
    .letters{
        width: 100px;
        height: 110px;
        .card-input.card-draggable{
            height: 90px;
            .card{
                height: 90px;
                max-height: 90px;
                .bg-color{
                    min-height: 80px;
                    .card-body{
                        font-size: 30px !important;
                        min-height: 80px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }
            }
        }
        .card-input.draggshadow{
            width: 100px;
            min-height: 90px;
            .card{
                height: 90px;
                max-height: 90px;
                .bg-color{
                    font-size: 32px;
                    min-height: 80px;
                    .card-body{
                        font-size: 30px !important;
                        min-height: 80px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }
            }
        }
    }
</style>
