<template>
    <div id="gibi" class="fill container gibi">
        <div class="gameplay">
            <div class="step-bars">
                <div
                    v-for="$category in categories"
                    :key="$category.slug"
                    class="bar"
                    :class="{'active': activeCategory === $category.slug }"
                    @click="selectCategory($category)"
                ></div>
            </div>
            <div class="categories">
                <div 
                    v-for="$category in categories" 
                    :key="$category.slug" 
                    class="category"
                >
                    {{ $category.title }}
                </div>
            </div>
            <div class="items-wrap">
                <CardDisplay>
                    <div class="items">
                        <div
                            v-for="(item, index) in category.items"
                            :key="index"
                            class="item" 
                        >
                            <figure>
                                <img :src="item._src" :alt="item.title">
                            </figure>
                        </div>
                    </div>
                </CardDisplay>
            </div>
            <div class="gameplay-body">
                <div class="gibi-container">
                    <div class="gibi-navigation">
                        <div class="btn-gibi-up"></div>
                        <div class="btn-gibi-prev"></div>
                        <div class="btn-gibi-prev"></div>
                        <div class="btn-gibi-down"></div>
                    </div>
                    <div class="canvas-container">
                        <canvas></canvas>
                    </div>
                </div>
            </div>
            <div class="gameplay-footer">
                <div class="gameplay-footer-actions">
                    <div class="gameplay-footer-action d-flex w-100">
                        <div class="gameplay-footer-buttons flex d-flex">
                            <div class="item small">
                                <div class="card-input card--input-text">
                                    <label>
                                        <b-card no-body>
                                            <b-card-body>
                                                <input
                                                    v-model="filename"
                                                    type="text"
                                                    v-bind="$attrs"
                                                    autocomplete="off"
                                                    selectionDirection="backward"
                                                    placeholder="Título do Gibi"
                                                />
                                            </b-card-body>
                                        </b-card>
                                    </label>
                                </div>
                            </div>
                            <div class="btn-gibi-save"></div>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'

import CardDisplay from '@/components/ui/form/CardDisplay'

export default {
    components: { CardDisplay },
    data() {
        return {
            filename: '',
            activeCategory: 'cenarios',
            categories: [
                { 
                    slug: 'cenarios',
                    title: 'Cenários', 
                    items: [
                        {
                            title: 'Montanha',
                            _src: require('@/assets/images/gibi/cenarios/01.jpg'),
                        },
                        {
                            title: 'Praia',
                            _src: require('@/assets/images/gibi/cenarios/02.jpg'),
                        },
                    ]
                },
                {
                    slug: 'pessoas', 
                    title: 'Pessoas', 
                    items: [
                        {
                            title: 'Bola',
                            name: 'image-1',
                            type: 'image',
                            image: null,
                            x: 24,
                            y: 24,
                            rotation: 0,
                            draggable: true,
                            _src: require('@/assets/images/gibi/pessoas/ball.jpg'),
                        },
                        {
                            title: 'Mestre Yoda',
                            name: 'image-3',
                            type: 'image',
                            image: null,
                            x: 24,
                            y: 24,
                            rotation: 0,
                            draggable: true,
                            _src: 'https://konvajs.org/assets/yoda.jpg',
                        }
                    ]
                },
                {
                    slug: 'animais',  
                    title: 'Animais', 
                    items: []
                },
                { 
                    slug: 'objetos',  
                    title: 'Objetos', 
                    items: []
                },
                { 
                    slug: 'baloes',  
                    title: 'Balões', 
                    items: []
                }
            ],
        }
    },
    computed: {
        category() {
            return this.categories.find(({ slug }) => this.activeCategory === slug )
        },
        getModuleImage(){
            return require('@/assets/images/btn-books.png')
        },
        ...mapState('Modules', ['activeModule'])
    },
    methods: {
        selectCategory(newCategory) {
            this.activeCategory = newCategory.slug
        }
    }
}
</script>

<style lang="scss">
.gibi {
    .categories {
        display: flex;
        width: 100%;
        .category {
            flex: 1;
            text-align: center;
            padding: 16px;
        }
    }
    .items-wrap {
        padding: 8px 16px;
        margin-bottom: 1rem;
    }
    .items {
        display: flex;
        white-space: nowrap;
        overflow-y: hidden;
        overflow-x: auto;
        .item {
            max-width: 160px;
            padding: 8px;
            img {
                display: inline-block;
                max-width: 100%;
            }
        }
    }
    .gameplay {
        &-body {
            border-top: 1px solid #ddd;
            height: 480px !important;
            min-height: 480px !important;
        }
        .gameplay-footer {
            &-actions{
                height: 60px !important;
            }
        }
    }
    .gibi-container {
        display: flex;
        flex-direction: row !important;
        .gibi-navigation {
            align-self: center;
            max-width: 20%;
            flex: 1;
        }
        .canvas-container {
            background-color: white;
            max-width: 80%;
            flex: 1;
            margin: 1.5rem 0px 1.5rem;
            border-radius: 16px;
            box-shadow: 0px 0px 24px transparentize($color: #000000, $amount: 0.6);
        }
    }
}
</style>