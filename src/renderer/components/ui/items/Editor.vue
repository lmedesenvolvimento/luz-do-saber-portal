<template>
    <div>
        <div id="toolbar">
            <select class="ql-font">
                <option selected>Montserrat</option>
                <option value="Roboto">Roboto</option>
            </select>
            <select class="ql-size">
                <option value="small">Pequeno</option>
                <option selected value="medium">Médio</option>
                <option value="large">Grande</option>
                <option value="huge">Enorme</option>
            </select>
            <button class="ql-bold">N</button>
            <button class="ql-italic">I</button>
            <button class="ql-underline">S</button>
            <button class="ql-align" selected>left</button>
            <button class="ql-align" value="center">center</button>
            <button class="ql-align" value="right">right</button>
            <span class="ql-formats">
                <button class="ql-list" value="ordered">Lista Ordenada</button>
                <button class="ql-list" value="bullet">Lista Não-ordenada</button>
            </span>
        </div>
        <div id="editor"></div>
    </div>
</template>
<script>
import Quill from 'quill';
import FormProps from '@ui/form'
import 'quill/dist/quill.snow.css';

const Font = Quill.import('formats/font');

Font.whitelist = ['Montserrat', 'Roboto'];
Quill.register(Font, true);

export default {
    components: { ...FormProps },
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
@import url('https://fonts.googleapis.com/css?family=Montserrat|Roboto&display=swap');
#editor{
    background-color: white;
    font-family: "Montserrat";
    // font-size: 18px;
    height: 300px;
    .ql-editor{
        height: 100%;
    }
}
.ql-font-Montserrat {
    font-family: 'Montserrat', sans-serif;
}
.ql-font-Roboto {
    font-family: 'Roboto', sans-serif;
}
</style>
