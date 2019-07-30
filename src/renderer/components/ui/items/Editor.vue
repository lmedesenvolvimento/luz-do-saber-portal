<template>
    <div>
        <div id="toolbar">
            <select class="ql-font">
                <option selected>Aref Ruqaa</option>
                <option value="mirza">Mirza</option>
                <option value="roboto">Roboto</option>
            </select>
            <select class="ql-size">
                <option value="small">Small</option>
                <option selected value="medium">Medium</option>
                <option value="large">large</option>
                <option value="huge">Huge</option>
            </select>
            <button class="ql-bold">N</button>
            <button class="ql-italic">I</button>
            <button class="ql-underline">S</button>
            <button class="ql-align" value="left">left</button>
            <button class="ql-align" value="center">center</button>
            <button class="ql-align" value="right">right</button>
            <span class="ql-formats">
                <button class="ql-list" value="ordered">Lista Ordenada</button>
                <button class="ql-list" value="bullet">Lista Não-ordenzda</button>
            </span>
        </div>
        <div id="editor"></div>
    </div>
</template>
<script>
import Quill from 'quill';
import 'quill/dist/quill.snow.css'
export default {
    mounted() {
        var quill = new Quill('#editor', {
            modules: {
                toolbar: '#toolbar'
            },
        });
    }
}
</script>
<style lang="scss">
#editor{
    background-color: white;
}
</style>
