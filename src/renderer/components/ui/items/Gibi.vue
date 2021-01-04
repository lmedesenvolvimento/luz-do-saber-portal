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
                    @click="selectCategory($category)"
                >
                    {{ $category.title }}
                </div>
            </div>
            <div class="items-wrap">
                <div class="card--display" style="width: 100%;">
                    <b-card
                        no-body
                    >
                        <b-card-body>
                            <div class="items">
                                <div
                                    v-for="(item, index) in category.items"
                                    :key="index"
                                    class="item" 
                                >
                                    <figure @click.stop="() => add(item)">
                                        <img :src="item._src" :alt="item.title">
                                    </figure>
                                </div>
                            </div>
                        </b-card-body>
                    </b-card>
                </div>
            </div>
            <div class="gameplay-body">
                <div class="gibi-container">
                    <div class="gibi-navigation">
                        <div 
                            class="btn-gibi-up" 
                            title="Página Anterior" 
                            @click="prevPage"
                        ></div>
                        <div 
                            class="btn-gibi-prev" 
                            title="Nova Página"
                            @click="newPage" 
                        ></div>
                        <div 
                            class="btn-gibi-prev" 
                            title="Remover Página Atual"
                            @click="removePage" 
                        ></div>
                        <div 
                            class="btn-gibi-down" 
                            title="Próxima Página"
                            @click="nextPage" 
                        ></div>
                    </div>
                    <div class="canvas-container">
                        <div v-if="page" id="canvas">
                            <v-stage 
                                ref="stage"
                                :config="configKonva" 
                                @mousedown="handleStageMouseDown"
                                @touchstart="handleStageMouseDown"
                            >
                                <v-layer>
                                    <v-image
                                        :config="{id: 'background', image: page.background}" 
                                    />
                                </v-layer>
                                <CanvasPath 
                                    v-for="path in page.paths" 
                                    :id="path.name" 
                                    :key="path.name" 
                                    :data="path"
                                    @change="onChangeElement"
                                />
                            </v-stage>
                        </div>
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
import { mapState, mapActions } from 'vuex'
import moment from 'moment'

import { v4 as uuidv4 } from 'uuid'

import CanvasPath from '@/components/ui/items/gibi/CanvasPath'

import categories from '@/services/GibiCatalog'

export default {
    components: { CanvasPath },
    data() {
        return {
            configKonva: {
                width: 750,
                height: 450
            },
            background: null,
            filename: null,
            activeCategory: 'cenarios',
            categories
        }
    },
    computed: {
        category() {
            return this.categories.find(({ slug }) => this.activeCategory === slug )
        },
        getModuleImage(){
            return require('@/assets/images/btn-books.png')
        },
        page() {
            return this.$store.getters['Gibi/currentPage']
        },
        ...mapState({
            'pages': ({ Gibi }) => Gibi.pages,
            'selectedShape': ({ Gibi }) => Gibi.selectedShape
        })
    },
    mounted() {
        this.newPage()
    },
    methods: {
        add(element) {
            element.type === 'background' 
                ? this.addBackground(element)
                : this.addElement(element)
        },
        addElement(element) {
            this.page.paths.push({ ...element, name: uuidv4() })
        },
        addBackground(background){
            const image = new Image()
            
            image.onload = () => {
                this.page.background = image
            }

            image.src = background._src
        },
        removeElement() {
            const pathIndex = this.page.paths.findIndex((path) => path.name === this.selectedShape)
            this.page.paths.splice(pathIndex, 1)
            this.selectShape(null)
        },
        handleStageMouseDown({ target }) {        
            const stage = target.getStage()
            const group = target.parent && target.parent.nodeType === 'Group' ? target.parent : null

            // clicked on stage - clear selection
            if (target.nodeType === stage.nodeType || target.attrs.id === 'background') {
                this.selectShape(null)
                return
            }

            // find clicked rect by its name
            const name = group && group.name() || target && target.name()
            const path = this.page && this.page.paths.find((r) => r.name === name)

            if (path) {
                this.selectShape(name)
            }
        },
        onChangeElement() {
            console.log(this.page)
            this.updatePage(this.page)
        },
        selectCategory(newCategory) {
            this.activeCategory = newCategory.slug
        },
        ...mapActions('Gibi', [
            'newPage',
            'removePage',
            'updatePage',
            'nextPage',
            'prevPage',
            'selectShape'
        ]),
        ...mapState('Modules', ['activeModule'])
    },
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
            &:hover {
                cursor: pointer;
            }
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
            &:hover {
                cursor: pointer;
            }
            img {
                display: inline-block;
                max-width: 100%;
                max-height: 84px;
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
            position: relative;
            background-color: white;
            max-width: 80%;
            flex: 1;
            margin: 1.5rem 0px 1.5rem;
            border-radius: 16px;
            box-shadow: 0px 0px 24px transparentize($color: #000000, $amount: 0.6);
            overflow: hidden;
        }
    }
}
</style>