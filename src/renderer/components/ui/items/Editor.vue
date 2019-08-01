<template>
    <div id="custom-editor">
        <div id="toolbar">
            <b-row class="fill">
                <b-col class="col-font-style">
                    <ls-card-display>
                        <select class="ql-font btn-editor">
                            <option selected class="ql-font-Montserrat">Montserrat</option>
                            <option value="Roboto" class="ql-font-Roboto">Roboto</option>
                        </select>
                    </ls-card-display>
                </b-col>
                <b-col class="col-font-size">
                    <ls-card-display>
                        <select class="ql-size btn-editor">
                            <option value="small">8</option>
                            <option selected value="medium">12</option>
                            <option value="large">18</option>
                            <option value="huge">24</option>
                        </select>
                    </ls-card-display>
                </b-col>
                <b-col class="col-text-style">
                    <ls-card-display>
                        <b-col>
                            <b-row>
                                <b-col class="no-padding">
                                    <button class="ql-bold btn-editor b-r"><b>N</b></button>
                                </b-col>
                                <b-col class="no-padding">
                                    <button class="ql-italic btn-editor b-r"><i>I</i></button>
                                </b-col>
                                <b-col class="no-border">                   
                                    <button class="ql-underline btn-editor"><u>S</u></button>
                                </b-col>
                            </b-row>
                        </b-col>
                    </ls-card-display>
                </b-col>
                <b-col class="col-text-align">
                    <ls-card-display>
                        <b-row>
                            <b-col class="no-padding"> 
                                <button class="ql-align btn-editor b-r " selected>left</button>
                            </b-col>
                            <b-col class="no-padding">
                                <button class="ql-align btn-editor b-r" value="center">center</button>
                            </b-col>
                            <b-col class="no-border">                    
                                <button class="ql-align btn-editor" value="right">right</button>
                            </b-col> 
                        </b-row>
                    </ls-card-display>
                </b-col>
                <b-col class="col-list">
                    <ls-card-display>
                        <span class="ql-formats">
                            <b-row>
                                <b-col class="no-padding">
                                    <button class="ql-list btn-editor b-r" value="ordered">L1</button>
                                </b-col>
                                <b-col class="no-border">
                                    <button class="ql-list btn-editor" value="bullet">l2</button>
                                </b-col>
                            </b-row>
                        </span>
                    </ls-card-display>
                </b-col>
            </b-row>
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
#custom-editor{
    #toolbar{
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 100px;
        background-color: #fafafa;
        border-bottom: 1.5px solid #ddd;
        padding: 0px 8px;
        flex: 1;
    }
    #editor{
        background-color: white;
        font-family: "Montserrat";
        max-width: 100%;
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
    .btn-editor {
        background: Transparent no-repeat;
        border: none;
        cursor:pointer;
        overflow: hidden;
        outline:none;
        font-size: 1.3rem;
        width: 100%;
    }
    .card--display{
        max-height: 90px;
    }
    .card-body{
        padding: 0.9rem 1rem !important;
    }
    .col-font-style{
        max-width: 22%;
    }
    .col-font-size{
        max-width: 11%;
    }
    .col-text-style{
        max-width: 15%;
    }
    .col-text-align{
        max-width: 24%;
    }
    .col-list{
        max-width: 15%;
    }
    .no-padding{
        padding: 0;
        border-right: solid black 1px;
    }
    .no-border{
        border: none;
        padding: 0;
    }
    .row{
        justify-content: center;
        align-items: center;
    }
}
</style>
