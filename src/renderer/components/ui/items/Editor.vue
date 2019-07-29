<template>
    <div>
        <!-- <div id="editor" ref="editor"></div> -->
        <div id="toolbar-container">
            <select class="ql-font">
                <option selected="Roboto">Roboto</option>
                <option value="Montserrat">Montserrat</option>
            </select>
        </div>
        <div id="editor-container">
            <p>When Mr. Bilbonificence, there was much talk and excitement in Hobbiton.</p>
        </div>
    </div>
</template>
<script>
import Quill from 'quill';
import 'quill/dist/quill.snow.css'
export default {
    props: {
        value: {
            type: String,
            default: ''
        }
    }, 

    data() {
        return {
            editor: null
        };
    },
    mounted() {
        var Font = Quill.import('formats/font');
        // We do not add Aref Ruqaa since it is the default
        Font.whitelist = ['Roboto', 'Montserrat'];
        Quill.register(Font, true);

        var quill = new Quill('#editor-container', {
            modules: {
                toolbar: '#toolbar-container'
            },
            theme: 'snow'
        });

        // var Font = Quill.import('formats/font');
        // Font.whitelist = ['Roboto'];
        // Quill.register(Font, true);

        // this.editor = new Quill(this.$refs.editor, {
        //     modules: {
        //         toolbar: [
        //             [{ header: [1, 2, 3, 4, false] }],
        //             ['bold', 'italic', 'underline'],
        //             [{fonts:['Roboto', 'aseasease', 'aseaseaseas']}]
        //         ],
        //     },
        //     theme: 'snow',
        //     formats: ['bold', 'underline', 'header', 'italic'],
        // });

        // this.editor.root.innerHTML = this.value;

        // this.editor.on('text-change', () => this.update());
    },

    methods: {
        update() {
            this.$emit('input', this.editor.getText() ? this.editor.root.innerHTML : '');
        }
    }
}
</script>
<style lang="scss">
    #editor-container {
        font-family: "Roboto";
        font-size: 18px;
        height: 375px;
    }
    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
    #toolbar-container .ql-font span[data-label="Roboto"]::before {
        font-family: "Roboto";
    }
    .ql-font-roboto {
        font-family: "Roboto";
    }
    #toolbar-container .ql-font span[data-label="Montserrat"]::before {
        font-family: "Montserrat";
    }
    .ql-font-Montserrat {
        font-family: "Montserrat";
    } 
</style>
