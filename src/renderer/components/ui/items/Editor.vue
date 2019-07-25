<template>
    <div id="app">
        <vue-editor v-model="content" :editor-toolbar="customToolbar"></vue-editor>
    </div>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import { ItemProps } from './index.js'

export default {
    components: {
        VueEditor,
    },
    mixins: [ItemProps],
    data() {
        return {
            content: '',
            customToolbar: [
                [{font:['roboto', 'Montserrat']}],
                ['bold', 'italic', 'underline'],
                [{align:''}, {align: 'center'},{align:'right'}],
                [{list:'ordered'}, {list:'bullet'}],
            ]
        };
    }
};
</script>
<style lang="scss" scoped>
    .quillWrapper{
        background-color: white;
    }
</style>
